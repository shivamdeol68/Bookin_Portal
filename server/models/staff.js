const { Schema, default:mongoose}=require("mongoose")

const StaffSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  otp: String,
  isVerified: { type: Boolean, default: false },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  token: String,
  role: { type: String, enum: ["admin", "staff"], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  assigneditem: { type: String, required:false },
  availableUntil: Date 
});



const Staff = new mongoose.model("Staff",StaffSchema)

module.exports=Staff;