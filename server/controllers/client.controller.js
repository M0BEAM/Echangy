//-> import client model form client.model file
const Client = require("../models/client.model")
//-> import bcrypt libary to crypt the password
const bcrypt = require("bcrypt")
//-> import json web token libary to generate the token
const jwt = require("jsonwebtoken")
//
const { transporter } = require("../config/emailValidation")
//
let code
//
let mailOptions = {}
//
const generateCode = () => {
  return Math.floor(Math.random() * 10) + "" + Math.floor(Math.random() * 10) + "" + Math.floor(Math.random() * 10) + "" + Math.floor(Math.random() * 10)
}
//
const sendMail = async (mailOptions) => {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error.message);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
//-> register function to added client in the data base
module.exports.register = async (req, res) => {
  //-> import all the information about client from body request
  const { name, email, ville, password } = req.body
  code = generateCode()
  mailOptions = {
    from: 'echangyproducts@gmail.com',
    to: email,
    subject: 'Mail Verification Code',
    html: `
    <p>Dear ${name},</p>
    <p>Your verification code is: <strong>${code}</strong></p>
    <p>Thank you for using Echangy.</p>
  `
  };
  //-> check if all the feelds not empty
  if (!name || !email || !ville || !password)
    return res.status(400).json({ success: false, message: "Feeld is empty" })

  try {
    //-> added the client to the data base 
    const client = await Client.create({ name, email, ville, password })

    if (!client)
      return res.status(400).json({ success: false, message: "Client not registred !!" })
    sendMail(mailOptions)
    res.status(200).json({
      success: true, message: "client aded to data base", client: client._id
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
//
module.exports.codeVerification = async (req, res) => {
  const { clientCode } = req.params
  const { clientId } = req.body
  try {

    if (clientCode === "")
      return res.status(400).json({ success: false, message: "clientCode i required !!" })
    const verif = clientCode === code;

    if (!verif)
      return res.status(400).json({ success: false, message: "clientCode is false !!" })
    res.status(200).json({ success: true, message: "clientCode is true !!", token: generateToken(clientId, process.env.SECRETKEY, "1d") })
  } catch (error) {
    return res.status(400).json({ success: false, message: "field is empty" })
  }


}
//-> login function to verify the client is registred on data base or not
module.exports.login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    return res.status(400).json({ success: false, message: "feelds is empty !" })
  //-> find the client using his email 
  const client = await Client.findOne({ email })
  if (!client)
    return res.status(401).json({ success: false, message: "email not found !!" })
  //--> compare the password if match or not
  const validPass = await bcrypt.compare(password, client.password)
  if (!validPass)
    return res.status(400).json({ success: false, message: "invalid password !" })
  res.status(200).json({ success: true, message: "client login successfully", token: generateToken(client._id, process.env.SECRETKEY, "1d") })
}
//--> generateToken function to generate a token using client id
const generateToken = (clientId, key, expire) => {

  return jwt.sign({ id: clientId }, key, {
    expiresIn: expire
  })

}




module.exports.resendMail = async (req, res) => {

  try {
    sendMail(mailOptions)
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }


}
//
let mailResetPassOptions = {}

module.exports.resetPassword = async (req, res) => {
  const { email } = req.body
  try {

    console.log("codeResetPass")
    if (!email)
      return res.status(400).json({ success: false, message: "Field is empty !!" })
    // const client = await Client.findByIdAndUpdate(idClient,{password})
    const client = await Client.findOne({ email })
    if (!client)
      return res.status(401).json({ success: false, message: "email not found !!" })
    // if (!client)
    //   return res.status(400).json({ success: false, message: "client password not updated !!" })
    mailResetPassOptions = {
      from: 'echangyproducts@gmail.com',
      to: email,
      subject: 'Reset Password URL',
      html: `
      <p>Dear ${client.name},</p>
      <p>Your Reset Password Link is: <a href="${process.env.LINKRESETPASS}${client._id}/${generateToken(client._id, process.env.SECRETKEYPASS, "15m")}" >${process.env.LINKRESETPASS}${client._id}/${generateToken(client._id, process.env.SECRETKEYPASS, "15m")}</a></p>
      <p>Thank you for using Echangy.</p>
    `
    };
    sendMail(mailResetPassOptions)
    res.status(200).json({ success: true, message: "clientCode is true !!" })
  } catch (error) {
    return res.status(400).json({ success: false, message: "field is empty" })
  }
}


module.exports.updatePassword = async (req, res) => {
  const { password } = req.body
  const { id } = req.params
  try {
    if (!password)
      return res.status(400).json({ success: false, message: "feelds is empty !" })
    let token
    //--> verify if the token is sending at the headers
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer"))
      return res.status(400).json({ success: false, message: "invalid cridentials" })
    token = req.headers.authorization.split(" ")[1]
    //--> generate a salt 
    const salt = await bcrypt.genSalt(10)
    //--> crypt the password using the salt generated
    const hashedPassword = await bcrypt.hash(password, salt)
    //--> decoded the token using the secret code 
    const verif = jwt.verify(token, process.env.SECRETKEYPASS)
    //--> return the client using his id
    const client = await Client.findById(verif.id)

    if (!client)
      return res.status(400).json({ success: false, message: "client not found !" })
    //
    if (client._id != id)
      return res.status(400).json({ success: false, message: "client not mutch !" })
    //-> find the client using id 
    const clientUpdated = await Client.findByIdAndUpdate(id, { password: hashedPassword })
    if (!clientUpdated)
      return res.status(401).json({ success: false, message: "client not found !!" })
    res.status(200).json({ success: true, message: "password updated successfuly !!" })
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }


}