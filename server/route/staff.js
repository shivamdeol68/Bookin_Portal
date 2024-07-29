const { staff_signin, staff_login, staff_logout, staff_verifyOtp, updateStaffAvailability, findallstaff, StaffAuth } = require("../controller/staff");
const router = require("express").Router();

router
    .post("/signin-staff", staff_signin)
    .post("/staffauth", StaffAuth)
    .get("/staff", findallstaff)
 .put("/:id/availability", updateStaffAvailability)
    .post("/VerifyOtp-staff",staff_verifyOtp)
    .post("/login-staff", staff_login)
    .post("/logout-staff",staff_logout)

module.exports = router;
