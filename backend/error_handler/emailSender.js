const nodemailer = require('nodemailer');
require("dotenv").config();
const { META_PASSWORD } = process.env;

const nodemailerConfig = {
    host: "smtp.meta.ua",
    port:  465,
    secure: true, 
    auth: {
        user: "walterhwhite_2024@meta.ua",
        pass: META_PASSWORD
    },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const emailSender = data => {
    const email = { 
        ...data, 
        from: "walterhwhite_2024@meta.ua" 
    };
    return transport.sendMail(email)
        .then(info => {
            console.log('Email sent:', info);
            return info;
        })
        .catch(error => {
            console.error('Error sending email:', error);
            throw error;
        });
};

module.exports = emailSender;
