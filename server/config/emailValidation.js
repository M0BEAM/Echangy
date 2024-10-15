const nodemailer = require('nodemailer');

module.exports.transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: 'echangyproducts@gmail.com',
    pass: process.env.MAILPASS 
  }
});



