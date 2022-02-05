const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: "Name is required",
            minlength: [2, "Too short"],
            maxlength: [32, "Too long"],
        },
        code: {
            type: String,
            unique: true,
            lowercase: true,
            text: true,
            index: true,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Language', languageSchema);