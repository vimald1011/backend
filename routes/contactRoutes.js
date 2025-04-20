const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

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

        res.status(201).json({ message: "Contact saved successfully!" });
    } catch (error) {
        console.error("Error saving contact:", error);
        res.status(500).json({ error: "Server error, contact not saved." });
    }
});

module.exports = router;
