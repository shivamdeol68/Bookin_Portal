const { signin, login, logout, verifyOtp, userdata, userAuth } = require("../controller/user");
const router = require("express").Router();

router
    .post("/signin", signin)
    .post("/VerifyOtp",verifyOtp)
    .get("/User-Data/:UserId", userdata)
    .post("/login", login)
    .post("/logout",logout)
    .post("/auth",userAuth)

module.exports = router;
