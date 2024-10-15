const WishList = require("../models/wishList.model")

module.exports.addProductToWishList = async (req, res) => {
    const { product, client } = req.body
     
    if (!product)
        return res.status(400).json({ success: false, message: "Product id not found !" })
    try {
        let isFoundProduct = false
        const getWishList = await WishList.find({})
        //let x = getWishList.findIndex(o=>{ getId(o.product._id) === product})
        getWishList.map((item) => {
            if (item.product.toString() === product && item.client.toString() === client) {
                isFoundProduct = true
                return
            }
        })
        if (isFoundProduct) {
            return res.status(400).json({ success: false, message: "product existing in wishList !!" })
        }
        else {
            const wishList = await WishList.create({ product, client })
            if (!wishList) {
                res.status(200).json({ success: true, message: "Check your network" })
            } else {
                res.status(200).json({ success: true, message: "product id is added to the wishList " })
            }
        } 
    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }
}
module.exports.getWishList = async (req, res) => {

    try {
        const wishList = await WishList.find({}).populate("product") //populate working only when the attrebute is allready in your model schema

        if (!wishList)
            return res.status(400).json({ success: false, message: "wishList is empty !!" })
        res.status(200).json({
            success: true,
            wishList
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }
}

module.exports.deleteFromWishListById = async (req, res) => {
    const { id, idClient } = req.params
    try {
        const allWishList = await WishList.find()
        let idWishList = ""
        allWishList.map((item) => {
            if (item.product.toString() === id && item.client.toString() === idClient) {
                idWishList = item._id
            }
        })
        const wishList = await WishList.findByIdAndDelete(idWishList)
        if (!wishList)
            return res.status(400).json({ success: false, message: "wishList is not deleted !!" })
        res.status(200).json({
            success: true,
            message: "wish liste deleted successfully"
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }
}


const getId = (product) => {
    return product.toString().slice(product.toString().indexOf('"') + 1, product.toString().lastIndexOf('"') - 1)
}