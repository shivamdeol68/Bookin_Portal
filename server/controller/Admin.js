const Admin = require("../models/Admin");
const {Cart} = require("../models/data");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const User = require("../models/user");
const Staff = require("../models/staff");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.USER_EMAIL, pass: process.env.USER_PASSWORD },
});

const generateOtp = () => {
  const otpLength = 4;
  const otpBuffer = crypto.randomBytes(otpLength);
  const digits = "0123456789";

  let OTP = "";
  for (let i = 0; i < otpLength; i++) {
    OTP += digits[otpBuffer[i] % 10];
  }

  return OTP;
};

const Adminsignin = async (req, res) => {
  try {
    const { name, email, password, gender } = req.body;
    const existuser = await Admin.findOne({ email });
    if (existuser) {
      req.status(400).json({ success: false, message: "Admin already exist" });
    }
    const hashedpassword = await bcrypt.hash(password, 10);

    const otp = generateOtp();
    const newuser = new Admin({
      name,
      email,
      password: hashedpassword,
      gender,
      otp,
    });

    const info = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Verify your OTP",
      text: `Hi there Please Verify  Your OTP. this is your OTP ${otp}.`,
    };
    await transport.sendMail(info);
    const saveAdmin = await newuser.save();
    res.status(201).json({
      success: true,
      message: "Admin registered",
      Admin: saveAdmin,
    });
  } catch (error) {
    res.send(error);
  }
};
const admin=async (req,res)=>{
  try {
    const admin= await Admin.find();
    if(!admin){
      res.status(400).json({success:false,message:"No Admin Found"})
    }
    res.status(200).json({success:true,message:"Admin Found",admin})
  } catch (error) {
    res.status(400).json({message:"No Admin Found",error})
  }
}
const admindata = async (req, res) => {
  const { adminId } = req.params;
  try {
    const data = await Admin.findById({ _id: adminId })
      .populate("Hotels")
      .populate("Flight")
      .populate("Cars")
      .populate("VacationPackages")
      .populate("Carts");
    if (!data) {
      res.status(400).json({ success: false, message: "No Data Found" });
    }
    console.log("Data found:", data);
    res
      .status(200)
      .json({ success: true, message: "Data Is Here", data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const assignStaffToUser = async (req, res) => {
  try {
    const { userId, staffId, cartId } = req.body;

    // Check if the user, staff member, and cart exist
    const user = await User.findById(userId);
    const staff = await Staff.findById(staffId);
    const cart = await Cart.findById(cartId); 
    console.log(cart);
    if (!user) {
      return res.status(404).json({ success: false, message: "User found" });
    }
    if ( !staff) {
      return res.status(404).json({ success: false, message: "staff member not found" });
    }  if ( !cart) {
      return res.status(404).json({ success: false, message: "cart not found" });
    }

    // Assign the staff member to the user and the cart
    user.assignedStaff = staffId;
    await user.save();

    staff.assigneditem = cartId;
    await staff.save();

    // Retrieve the user ID assigned to the staff member
    const assignedUserId = await User.findOne({ assignedStaff: staffId });
    const assignedCartId = await Staff.findOne({ assigneditem: cartId });

    res.status(200).json({ success: true, message: "Staff member assigned to user and cart successfully", user: { userId, assignedStaff: staffId, assigneditem: cartId , assignedUserId: assignedUserId._id } });
  } catch (error) {
    console.error("Error assigning staff member to user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


const AdminverifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    console.log(`OTP is ${otp}`);
    let AdminPanel = await Admin.findOne({ otp });
    if (!AdminPanel) {
      return res
        .status(400)
        .send({ success: false, message: "No Admin found" });
    }
    if (AdminPanel.otp !== otp) {
      return res.status(422).send({ success: false, message: "Invalid OTP" });
    }
    AdminPanel.isVerified = true;
    AdminPanel.otp = null;
    await AdminPanel.save();
    res
      .status(200)
      .json({
        success: true,
        message: "Account verified successfully",
        AdminPanel,
      });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const Adminlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginAdmin = await Admin.findOne({ email });
    if (!loginAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin not found",
      });
    }
    const matchpassword = await bcrypt.compare(password, loginAdmin.password);
    if (!matchpassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }
    const token = await jwt.sign(
      { AdminId: loginAdmin._id },
      process.env.ADMIN_JWT_SECRET_TOKEN // Use a different secret for admin tokens
    );
    loginAdmin.token = token;
    res.cookie("admin_token", token, { // Use a different cookie name for admin tokens
      httpOnly: true,
      expires: new Date(Date.now() + 60000 * 1000), // Set appropriate expiry time
    });
    const savedAdmin = await loginAdmin.save();
    res.status(200).json({ success: true, message: "Login successful", savedAdmin });
  } catch (error) {
    console.error("Error in Adminlogin:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const Adminlogout = async (req, res) => {
  try {
    const { admin_token } = req.cookies; // Use the correct cookie name for admin token
    console.log("admin_token", admin_token); // Log the admin token
    if (!admin_token) {
      return res.status(400).json({
        success: false,
        message: "Admin not logged in",
      });
    }
    const decoded = await jwt.verify(admin_token, process.env.ADMIN_JWT_SECRET_TOKEN); // Use the correct secret key for admin token
    console.log("decoded", decoded);
    if (decoded) {
      const admin = await Admin.findById(decoded.AdminId);
      console.log(admin);
      admin.token = null;
      await admin.save();
      res.clearCookie("admin_token"); // Clear the correct cookie for admin token
      res.status(200).json({ success: true, message: "Logged out" });
      return;
    }
  } catch (error) {
    console.error("Error logging out admin:", error); // Log the error
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const AdminAuth = async (req, res) => {
  try {
    const { admin_token } = req.cookies; // Use the correct cookie name for admin token
    console.log("admin_token", admin_token); // Log the admin token
    if (!admin_token) {
      return res.status(400).json({
        success: false,
        message: "Admin not logged in",
      });
    }
    const decoded = await jwt.verify(admin_token, process.env.ADMIN_JWT_SECRET_TOKEN); // Use the correct secret key for admin token
    console.log("decoded", decoded);
    if (decoded) {
      const admin = await Admin.findById(decoded.AdminId);
      console.log(admin);
      res.status(200).json({ success: true, message: "Authorized", admin });
      return;
    }
  } catch (error) {
    console.error("Error authenticating admin:", error); // Log the error
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


module.exports = {
  Adminsignin,
  Adminlogin,
  assignStaffToUser,
  Adminlogout,
  AdminverifyOtp,
  admindata,
  admin,
  AdminAuth
};
