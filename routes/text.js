const express = require('express');

const router = express.Router();
const { create, list, edit, count, countLanguage, mostOccurrent, submit, approve, reject, search } = require("../controllers/text")

router.post('/text', create);
router.get('/text', list);
router.put('/text/:id', edit);
router.get('/text/:id/count', count);
router.get('/text/:id/count/:languageId', countLanguage);
router.get('/text/mostOccurrent', mostOccurrent);

router.put('/text/:id/submit', submit);
router.put('/text/:id/approve', approve);
router.put('/text/:id/reject', reject);

router.get('/text/search', search)

module.exports = router;