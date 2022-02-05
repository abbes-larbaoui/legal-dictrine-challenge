const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

const textLanguageSchema = new mongoose.Schema(
    {
        text_override: {
            type: ObjectId,
            ref: "Text",
        },
        language_override: {
            type: ObjectId,
            ref: "Language",
        },
        body: {
            type: String,
            required: true,
            maxlength: 2000,
            text: true,
        }
    },
    { timestamps: true }
);

textLanguageSchema.plugin(mongoose_fuzzy_searching, {fields: ['body']});

module.exports = mongoose.model('TextLanguage', textLanguageSchema);