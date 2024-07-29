const { Schema, default:mongoose}=require("mongoose")


const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    otp: String,
    isVerified: { type: Boolean, default: false },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    token: String,
    Carts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "CartItem"}],
      assignedStaff: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },
      Feedback: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Feedback"
      }]
  });
  

const User = new mongoose.model("user",UserSchema)

module.exports=User;