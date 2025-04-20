const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    number: Number,
    message: String,
});

module.exports = mongoose.model("Contact", contactSchema);
