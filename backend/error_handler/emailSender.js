const nodemailer = require('nodemailer');
require("dotenv").config();
const { META_PASSWORD } = process.env;

const nodemailerConfig = {
    host: " smtp.gmail.com",
    port:  587,
    secure: true, 
    auth: {
        user: "throwingaway2024@gmail.com",
        pass: META_PASSWORD
    },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const emailSender = data => {
    const email = { 
        ...data, 
        from: "throwingaway2024@gmail.com" 
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
