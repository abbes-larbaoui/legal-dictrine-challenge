const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const texteSchema = new mongoose.Schema(
    {
        textsLanguages: [
            {
                    type: ObjectId,
                    ref: "TextLanguage"
            }
        ],
        textStatus: {
            type: String,
            default: "Draft",
            enum: [
                "Draft",
                "Submitted",
                "Approved",
                "Rejected"
            ]
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Text', texteSchema);