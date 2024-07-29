require("dotenv").config()
const mongoose=require("mongoose")


const connectmongo=async()=>{
    try {
        await mongoose.connect(process.env.mongo_connect)
        console.log("database connect sucessfully");
    } catch (error) {
        console.log("error to connect database");
        console.log(error);
    }
}

module.exports=connectmongo;