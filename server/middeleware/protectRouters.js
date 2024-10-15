const jwt = require("jsonwebtoken")
const Client = require("../models/client.model")
//--> protect routers function to protect routers using jwt 
module.exports.protectRouters = async (req, res, next) => {
    let token
    //--> verify if the token is sending at the headers
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer"))
        return res.status(400).json({ success: false, message: "invalid cridentials" })
    token = req.headers.authorization.split(" ")[1]
    try {
     
        //--> decoded the token using the secret code 
        const verif = jwt.verify(token, process.env.SECRETKEY)
        //--> return the client using his id
        const client = await Client.findById(verif.id)
        if (!client)
            return res.status(400).json({ success: false, message: "you not login !" })
        //-->send the client in request
        req.client = client
        next()
    } catch (error) {
        res.status(500).json({ success: false, message: "you don't have the right to access this router" })
    }

} 