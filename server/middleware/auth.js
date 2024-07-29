const jwt=require("jsonwebtoken")
require("dotenv").config();


const authentication = async(req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token){
            res.status(400).json({
                sucess:false,
                message:"user not log in"
            })
        }
        const decoded = await jwt.verify(token,process.env.JWT_SECRET_TOKEN)
        if(!decoded){
            res.status(400).json({
                sucess:false,
                message:"user not autified"
            })
        }
        res.userId=decoded.userid;
        next()
    } catch (error) {
        res.send(error)
    }
}

module.exports=authentication;