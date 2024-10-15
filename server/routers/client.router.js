//-->import the router from express
const router = require("express").Router()
//-->import register and login function from client.controller file
const {register,login,updatePassword,codeVerification,resendMail,resetPassword} = require("../controllers/client.controller")
//--> make a post request using /register path
router.post("/register",register)
//--> make a post request using /login path 
router.post("/login",login)
//--> 
router.post("/verifCode/:clientCode",codeVerification)
//--> 
router.get("/resendCode",resendMail)
//--> 
router.post("/resetPassword",resetPassword)
//--> 
router.put("/updatePassword/:id",updatePassword)
//---> export router
module.exports = router