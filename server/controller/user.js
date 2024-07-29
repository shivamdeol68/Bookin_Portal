const user = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer")
const crypto = require('crypto');


const transport= nodemailer.createTransport({
    service:"gmail",
    auth:{user:process.env.USER_EMAIL,pass:process.env.USER_PASSWORD}
})

const generateOtp = () =>{
    const otpLength = 4;
    const otpBuffer = crypto.randomBytes(otpLength);
    const digits = '0123456789';

    let OTP = '';
    for (let i = 0; i < otpLength; i++) {
        OTP += digits[otpBuffer[i] % 10];
    }

    return OTP;

}

const signin = async (req, res) => {
  try {
    const { name, email, password, gender } = req.body;
    console.log(req.body);
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const otp = generateOtp();
    const newUser = new user({
      name,
      email,
      password: hashedPassword,
      gender,
      otp
    });
    
    const info = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Verify your OTP",
      text: `Hi there! Please verify your OTP. This is your OTP: ${otp}.`,
    };
    await transport.sendMail(info);
    const savedUser = await newUser.save();
    res.status(201).json({
      success: true,
      message: "User registered",
      user: savedUser,
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    console.log(`OTP is ${otp}`);
    let users = await user.findOne({otp});
    if (!users) {
      return res.status(400).send({ success: false, message: "No user found" });
    }
    if (users.otp !== otp) {
      return res.status(422).send({ success: false, message: "Invalid OTP" });
    }
    users.isVerified = true;
    users.otp = null;
    await users.save();
    res
      .status(200)
      .json({ success: true, message: "Account verified successfully" });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};




const userdata = async (req, res) => {
  const { UserId } = req.params;
  try {
    const data = await user.findById(UserId).populate("Carts");
    if (!data) {
      return res.status(400).json({ success: false, message: "No Data Found" });
    }
    console.log("Data found:", data);
    return res.status(200).json({ success: true, message: "Data Is Here", data: data.Carts }); // Return only the array of cart items
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginuser = await user.findOne({ email });
    if (!loginuser) {
      res.status(400).json({
        sucess: false,
        message: "user not found",
      });
    }
    const matchpassword = await bcrypt.compare(password, loginuser.password);
    if (!matchpassword) {
      res.status(401).json({
        sucess: false,
        message: "user not found",
      });
    }
    const token = await jwt.sign(
      { userId: loginuser._id },
      process.env.JWT_SECRET_TOKEN
    );
    loginuser.token = token;
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 6000 * 1000),
    });
    const savedUser = await loginuser.save();
    res
      .status(200)
      .json({ success: true, message: "Login successfull", loggedinUser:[savedUser._id,savedUser.token,savedUser.name,savedUser.email,savedUser.Carts] });
  } catch (error) {
    res.status(500).json(error);
  }
};


const logout = async (req, res) => {
  try {
    const { token } = req.cookies;
    console.log("token", token);
    if (!token) {
      return res.status(400).json({
        sucess: false,
        message: "user not log in",
      });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    console.log("decoded", decoded);
    if (decoded) {
      const use = await user.findById(decoded.userId);
      console.log(use);
      use.token = null;
      await use.save();
      res.clearCookie("token");
      res.status(200).json({ sucess: true, message: "Logged out" });
      return;
    }
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};


const userAuth = async (req, res) => {
  try {
    const { token } = req.cookies;
    console.log("token", token);
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "User not logged in",
      });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    console.log("decoded", decoded);
    if (decoded) {
      const use = await user.findById(decoded.userId); // Assuming 'AdminId' is the correct property
      if (!use) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      console.log("user", use);
      await use.save();
      res.status(200).json({ sucess: true, message: "Authorized", use });
      return;
    }
  } catch (error) {
    console.error("Error in userAuth:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { signin, login, logout ,verifyOtp,userdata,userAuth};
