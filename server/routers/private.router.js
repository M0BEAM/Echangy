const router = require("express").Router()
//---> import protectRouters function from protectRouters file
const {protectRouters} = require("../middeleware/protectRouters")
//---> import private function from private file
const {private} = require("../middeleware/private")
//--->make a get request to verify the client log in or not
router.get("/private",protectRouters,private)
module.exports = router