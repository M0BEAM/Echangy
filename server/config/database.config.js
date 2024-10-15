//-> import mongoose libary
const mongoose = require("mongoose")
mongoose.set('strictQuery', false);
    //-> connext to the data base uri
mongoose.connect(process.env.DB_URI)
//-> verify if the connection with data base is successfuly
mongoose.connection.on("connected",()=>{
    console.log("data base connected successfully")
})
//-> when the connection is failed
mongoose.connection.on("error",()=>{
    console.log("check your connection failed !!")
})

//-> export mongoose
module.exports = mongoose