const Product = require("../models/product.model")
const WishList = require("../models/wishList.model")

module.exports.addProduct = async(req,res) => {
    const {name,image,description,phoneNumber,client} = req.body

    if(!name || !image || !description || !phoneNumber ||   !client)
    return res.status(400).json({success:false,message:"feeld is empty "})
    try {
        const product = await Product.create({name,image,description,phoneNumber,client})
        if(!product)
        return res.status(400).json({success:false,message:"Product not registred !!"})
        res.status(200).json ({success:true,message:"product is aded to data base "})

    } catch (error) {
        res.status(500).json({success:false,message:error})
    }
}

module.exports.getProducts = async (req,res) => {
    try {
        const products = await Product.find().populate("client")
        if(!products)
        return res.status(400).json({success:false,message:"Products not found !!"})
        res.status(200).json({success:true,products})
    } catch (error) {
        return res.status(400).json({success:false,message:error})
    }
}

module.exports.deleteProductById = async (req,res) => {
    const  {id} = req.params
    if(!id)
    return res.status(400).json({success:false,message:"id not found !!"})
    try {
        const product = await Product.findByIdAndDelete(id)
        const wishList = await WishList.deleteOne({product:id})
        if(!product && !wishList)
        return res.status(400).json({success:false,message:"Product or wishList not deleting !!"})
        res.status(200).json({success:true,message:"product and wishList was deleted successfuly"})
    } catch (error) {
        return res.status(400).json({success:false,message:error})
    }
}

module.exports.upadateProduct = async(req,res) => {
    const {name,description,phoneNumber} = req.body
    const  {id} = req.params
  console.log(id)
    try {
        const product = await Product.findByIdAndUpdate(id,{name,description,phoneNumber})
        if(!product)
        return res.status(400).json({success:false,message:"Product not updated !!"})
        res.status(200).json ({success:true,message:"product is updated successfully "})

    } catch (error) {
        res.status(500).json({success:false,message:error})
    }
}