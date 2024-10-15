const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
//--> model saved in data base like object
const clientSchema = new mongoose.Schema({
    name: {
        require: true,
        type: String,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    ville: {
        require: true,
        type: String,
    },
    password: {
        require: true,
        type: String,
    }
})
//-->this function working before saving the data in data base 
clientSchema.pre("save", async function () {
    //--> generate a salt 
    const salt = await bcrypt.genSalt(10)
    //--> crypt the password using the salt generated
    this.password = await bcrypt.hash(this.password, salt)
})
//

//-->save the model client in the data base using mongoose libary
module.exports = mongoose.model("client", clientSchema)