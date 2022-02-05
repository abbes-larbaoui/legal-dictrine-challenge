const Language = require("../models/language");

exports.create = async (req, res) => {
    try {
        const { code, name } = req.body;
        const language = await new Language({
            name,
            code
        }).save();
        console.log(code);
        res.json(language);
    } catch (err) {
        res.status(400).send("create language failed");
    }
};

exports.list = async (req, res) => {
    res.json(await Language.find({}).sort({createdAt: -1}).exec());
}

exports.read = async (req, res) => {
    let language = await Language.findOne({code: req.params.code}).exec();
    res.json(language);
}

exports.update = async (req, res) => {
    const { name, code } = req.body;
    try {
        
        const updated = await Language.findOneAndUpdate(
            { code: req.params.code },
            { name, code },
            { new: true }
        );
        res.json(updated);

    } catch (error) {
        res.status(400).send("Update language failed");
    }
};

exports.remove = async (req, res) => {
    try {
        const deleted = await Language.findOneAndDelete({code: req.params.code});
        res.json(deleted);
    } catch (error) {
        res.status(400).send("Language delete failed");
    }
};