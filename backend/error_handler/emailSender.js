const nodemailer = require('nodemailer');
require("dotenv").config();
const {META_PASSWORD} = process.env;

const nodemailerConfig = {
    host: "",
    port: 465,
    secure: true,
    auth: {
        user: "",
        pass: META_PASSWORD
    }
};

const transport = nodemailer.createTransport(nodemailerConfig);

const emailSender = data => {
    const email = { 
        ...data, 
        from: "" };
    return transport.sendMail(email);
};

module.exports = emailSender;