const express = require('express');

const router = express.Router();
const { create, read, update,  remove, list } = require("../controllers/language")

router.post('/language', create);
router.get('/languages', list);
router.get('/language/:code', read);
router.put('/language/:code', update);
router.delete('/language/:code', remove);

module.exports = router;