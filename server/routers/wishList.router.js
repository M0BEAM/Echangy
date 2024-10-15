//-->import the router from express
const router = require("express").Router()
//-->import register and login function from client.controller file
const {addProductToWishList,getWishList, deleteFromWishListById} = require("../controllers/wishList.controller")
//--> make a post request using /register path
router.post("/wishList",addProductToWishList)
router.get("/getWishList",getWishList)
router.delete("/deleteWishList/:id/:idClient",deleteFromWishListById)

module.exports = router