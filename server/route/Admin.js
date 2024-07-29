const { Adminsignin, Adminlogin, Adminlogout, AdminverifyOtp, admindata, assignStaffToUser, admin, AdminAuth } = require("../controller/Admin");
const router = require("express").Router();

router
    .post("/Admin-signin", Adminsignin)
    .get("/Admin-Data/:adminId", admindata)
    .post("/Assign", assignStaffToUser)
    .post("/Admin-Verification-Otp", AdminverifyOtp)
    .post("/Admin-login", Adminlogin)
    .post("/Admin-logout", Adminlogout)
    .get("/admin",admin)
    .post("/adminauth",AdminAuth)

module.exports = router;
