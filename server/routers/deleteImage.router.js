const cloudinary = require('cloudinary').v2;
const router = require("express").Router()
// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret:  process.env.CLOUDINARY_SECRETKEY,
});

// Define a route for deleting an image
router.delete('/delete-image/:publicId', async (req, res) => {
  try {
    const { publicId } = req.params;

    // Use the destroy method to delete the image from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);

    res.json({ message: 'Image deleted successfully', result });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: 'Error deleting image' });
  }
});

module.exports = router