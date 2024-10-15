/* --------------------   import library  ------------------------- */

//-> dot env to access to env file using process.env
require("dotenv").config()
//-> import data base config
require("./config/database.config")
//
const productRouters = require("./routers/product.router")
//
const cors = require("cors")
//-> import protect router from private.router file
const protectRouter = require("./routers/private.router")
//-> import client routers from client.router file
const clientRouters = require("./routers/client.router")
//-> import wishList routers from client.router file
const wishListRouters = require("./routers/wishList.router")
//-> import client routers from client.router file
const deleteImageRouter = require("./routers/deleteImage.router")
//-> import express api
const express = require("express")
//-> create instance from express
const app = express()
//-> initialize the port
const PORT = process.env.PORT || 3001
//
app.use(cors({
    allowedHeaders: ['X-API-KEY', 'Authorization', 'Content-Type'],
  }))
//-> use format json on server request and responce 
app.use(express.json({ limit: '50mb' }));
app.use(express.json())
// Middleware for API key authentication
const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.header('X-API-Key');
    if (!apiKey || process.env.APIKEY !== apiKey) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    next();
};

// Apply the API key middleware to all routes
 app.use(apiKeyMiddleware);

//-> use the client routers
app.use("/api", clientRouters)
//-> use the protect router
app.use("/api", protectRouter)
//
app.use("/api", productRouters)
//
app.use("/api", deleteImageRouter)

//
app.use("/api", wishListRouters)
//listen to the port //running the server
app.listen(PORT, () => {
    console.log("Server is running at Port: " + PORT)
})