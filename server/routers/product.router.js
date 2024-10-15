//-->import the router from express
const router = require("express").Router()
//-->import register and login function from client.controller file
const {addProduct,getProducts,deleteProductById,upadateProduct} = require("../controllers/product.controller")
//--> make a post request using /register path
router.post("/addProduct",addProduct)
//--> make a post request using /login path 
router.get("/getProduct",getProducts)
///
router.delete("/delete/:id",deleteProductById)
///
router.put("/update/:id",upadateProduct)
//---> export router
module.exports = router