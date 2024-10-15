const mongoose = require("mongoose")
//--> model saved in data base like object
const productSchema = new mongoose.Schema({
    name:{
        require:true,
        type:String,
    },
    image:{
        require:true,
        type:String,
    },
    description:{
        require:true,
        type:String,
    },
    phoneNumber:{
        require:true,
        type:Number,
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "client"
    }
})

//-->save the model product in the data base using mongoose libary
module.exports = mongoose.model("product",productSchema)