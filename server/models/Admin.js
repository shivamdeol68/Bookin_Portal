const { Schema, default: mongoose } = require("mongoose");

const AdminSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  otp: String,
  isVerified: { type: Boolean, default: false },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  token: String,
  Hotels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
    },
  ],
  Flight: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
    },
  ],
  Cars: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CarRent",
    },
  ],
  VacationPackages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VacationPackage",
    },
  ],
  Carts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
  ],
  Feedback: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feedback",
    },
  ],
});

const Admin = new mongoose.model("Admin", AdminSchema);

module.exports = Admin;
