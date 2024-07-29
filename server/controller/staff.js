const staff = require("../models/staff");
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

const staff_signin = async (req, res) => {
  try {
    const { name, email, password, gender,role,createdAt,updatedAt } = req.body;
    const existingStaff = await staff.findOne({ email });
    if (existingStaff) {
      return res.status(400).json({ success: false, message: "Staff already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const otp = generateOtp();
    const newstaff = new staff({
      name,
      email,
      password: hashedPassword,
      gender,
      otp,
      role,
      createdAt,
      updatedAt
    });
    
    const info = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Verify your OTP",
      text: `Hi there! Please verify your OTP. This is your OTP: ${otp}.`,
    };
    await transport.sendMail(info);
    const savedStaff = await newstaff.save();
    res.status(201).json({
      success: true,
      message: "User registered",
      staff: savedStaff,
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const staff_verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    console.log(`OTP is ${otp}`);
    let users = await staff.findOne({otp});
    if (!users) {
      return res.status(400).send({ success: false, message: "No staff found" });
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

const staff_login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginstaff = await staff.findOne({ email });
    if (!loginstaff) {
      res.status(400).json({
        success: false,
        message: "Staff not found",
      });
    }
    const matchpassword = await bcrypt.compare(password, loginstaff.password);
    if (!matchpassword) {
      res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }
    const token = await jwt.sign(
      { staffId: loginstaff._id },
      process.env.STAFF_JWT_SECRET_TOKEN
    );
    loginstaff.token = token;
    res.cookie("Stafftoken", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 6000 * 1000),
    });
    const savedStaff = await loginstaff.save();
    res
      .status(200)
      .json({ success: true, message: "Login successful", loggedinStaff: [savedStaff._id, savedStaff.token, savedStaff.name, savedStaff.email] });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const StaffAuth = async (req, res) => {
  try {
    const { Stafftoken } = req.cookies;
    console.log("token", Stafftoken);
    if (!Stafftoken) {
      return res.status(400).json({
        success: false,
        message: "User not logged in",
      });
    }
    const decoded = await jwt.verify(Stafftoken, process.env.STAFF_JWT_SECRET_TOKEN);
    console.log("decoded", decoded);
    if (decoded) {
      const user = await staff.findById(decoded.staffId);
      console.log(user);
      await user.save();
      res.status(200).json({ success: true, message: "Authorized", staff:user });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const staff_logout = async (req, res) => {
  try {
    const { Stafftoken } = req.cookies;
    console.log("token", Stafftoken);
    if (!Stafftoken) {
      return res.status(400).json({
        success: false,
        message: "User not logged in",
      });
    }
    const decoded = await jwt.verify(Stafftoken, process.env.STAFF_JWT_SECRET_TOKEN);
    console.log("decoded", decoded);
    if (decoded) {
      const user = await staff.findById(decoded.staffId);
      console.log(user);
      user.token = null;
      await user.save();
      res.clearCookie("Stafftoken");
      res.status(200).json({ success: true, message: "Logged out" });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



const findallstaff =async(req,res)=>{
  try {
    const findstaff=await staff.find();
    if (!findstaff) {
      res.status(400).json({
        sucess: false,
        message: "staff not found",
      });
    }
    res.status(200).json({
      sucess:true,
      message:"all staff",
      findstaff
    })
  } catch (error) {
    res.status(400).json({
      message: "staff not found",
    });
    console.log(error);
  }
}



const updateStaffAvailability = async (req, res) => {
  try {
      const { id } = req.params;
      const { available } = req.body;

      // Calculate availability expiration time (e.g., one day from now)
      const availableUntil = new Date();
      availableUntil.setDate(availableUntil.getDate() + 1); // One day from now

      // Update the staff document with the new availability information
      const updatedStaff = await Staff.findByIdAndUpdate(id, { available, availableUntil }, { new: true });
      res.json({ success: true, data: updatedStaff });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
};



module.exports = { staff_signin, staff_login, staff_logout ,staff_verifyOtp,updateStaffAvailability,findallstaff,StaffAuth};
