const Text = require("../models/text");
const TextLanguage = require("../models/textLanguage");


exports.create = async (req, res) => {
    try {
        TextLanguage.collection.insertMany(req.body.textsLanguages,  (err, docs) => {
            if (err){ 
               console.log(err);
            } else {
                let text = new Text({
                    textsLanguages : Object.values(docs.insertedIds)
                });
                text.save((err, result) => {
                    console.log('parent save');
                })
                res.status(200).send(text);
            }
        });
    } catch (err) {
        res.status(400).send(`create text failed :${err}`);
    }
};

exports.list = async (req, res) => {
    const page = parseInt(req.query.page);
    const perPage = parseInt(req.query.perPage);
    try {
        res.json(await Text.find({}).populate('textsLanguages')
                                    .limit(perPage)
                                    .skip(perPage * (page - 1))
                                    .sort({createdAt: -1})
                                    .exec()
        );
    } catch (err) {
        res.status(400).send(`get list text failed :${err}`);
    }
};

exports.edit = async (req, res) => {
    try {
        const text = await Text.findOne(
            { _id: req.params.id },
        ).exec();
        text.textsLanguages.forEach((element) => {
            TextLanguage.findByIdAndUpdate(
                { _id: element._id},
                { 
                    body : req.body.textsLanguages.filter(t => t._id == element)
                                                  .map(t => t.body)[0]
                },
            ).exec();
        });
        res.json(text);
    } catch (error) {
        console.log(error.message);
        return res.status(400).send('Text edit failed');
    }
};

exports.count = async (req, res) => {
    try {
        const text = await Text.findOne(
            { _id: req.params.id },
        ).populate('textsLanguages').exec();
        res.json(text.textsLanguages.map(t => t.body)
                                    .join(" ")
                                    .split(" ")
                                    .length);
    } catch (err) {
        res.status(400).send(`get text text failed :${err}`);
    }
};

exports.countLanguage = async (req, res) => {
    try {
        const text = await Text.findOne(
            { _id: req.params.id },
        ).populate('textsLanguages').exec();
        res.json(text.textsLanguages.filter(t => t.language_override == req.params.languageId)
                                    .map(t => t.body)
                                    .join(" ")
                                    .split(" ")
                                    .length);
    } catch (err) {
        res.status(400).send(`get text text failed :${err}`);
    }
};

exports.mostOccurrent = async (req, res) => {
    try {
        const result = await TextLanguage.aggregate([
            { $project : { word : { $split: ["$body", " "] } } },
            { $unwind : "$word" },
            { $group : { _id:  "$word" , total : { "$sum" : 1 } } },
            { $sort : { total : -1 } }
            ]);
          res.json(result[0]._id);
    } catch (err) {
        res.status(400).send(`get text text failed :${err}`);
    }
};

exports.submit = async (req, res) => {
    try {
        Text.findOne({_id: req.params.id}, (err, text) => {
            if (text.textStatus == "Draft" || text.textStatus == "Rejected") {
                text.textStatus = "Submitted"
                text.save((err) => {
                    if(err) {
                        console.error('ERROR!');
                    }
                });
                res.json(text);
            } else {
                res.json('Can not change text status');
            }        
        });
    } catch (err) {
        res.status(400).send(`change text status failed :${err}`);
    }
};

exports.approve = async (req, res) => {
    try {
        Text.findOne({_id: req.params.id}, (err, text) => {
            if (text.textStatus == "Submitted" ) {
                text.textStatus = "Approved"
                text.save((err) => {
                    if(err) {
                        console.error('ERROR!');
                    }
                });
                res.json(text);
            } else {
                res.json('Can not change text status');
            }        
        });
    } catch (err) {
        res.status(400).send(`change text status failed :${err}`);
    }
};

exports.reject = async (req, res) => {
    try {
        Text.findOne({_id: req.params.id}, (err, text) => {
            if (text.textStatus == "Submitted" ) {
                text.textStatus = "Rejected"
                text.save((err) => {
                    if(err) {
                        console.error('ERROR!');
                    }
                });
                res.json(text);
            } else {
                res.json('Can not change text status');
            }        
        });
    } catch (err) {
        res.status(400).send(`change text status failed :${err}`);
    }
};

exports.search = async (req, res) => {
    try {
        TextLanguage.fuzzySearch(req.query.q).then((text) =>{
            res.json(text)
        } ).catch(console.error);
    } catch (err) {
        res.status(400).send(`change text status failed :${err}`);
    }
};