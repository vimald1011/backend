const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const { from, Subject } = require("rxjs");
const nodemailer = require('nodemailer');


// Nodemailer Setup here

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'aditid1011@gmail.com',
        pass: 'gdqlxbojmfnozbcm',
    },
});

// Handle POST request to save contact form
router.post("/", async (req, res) => {
    try {
        const { name, email, number, message } = req.body;

        const newContact = new Contact({
            name,
            email,
            number,
            message,
        });

        await newContact.save();


        //send email using nodemailer
        const mailOptions = {
            from: 'aditid1011@gmail.com',
            to: 'vimald1011@gmail.com',
            Subject: 'New Contact Form Submission',
            text: `
            Name: ${name}
            Email: ${email}
            Number: ${number}
            Message: ${message}
            `,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Email failed", error);

            } else {
                console.log("Email sent: ", info.response);

            }
        })

        res.status(201).json({ message: "Contact saved successfully!" });

    } catch (error) {
        console.error("Error saving contact:", error);
        res.status(500).json({ error: "Server error, contact not saved." });
    }

});

module.exports = router;
