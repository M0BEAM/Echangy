const mongoose = require("mongoose")
//--> model saved in data base like object
const wishListSchema = new mongoose.Schema({

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "client"
    }

})

//-->save the model product in the data base using mongoose libary
module.exports = mongoose.model("wishlist",wishListSchema)