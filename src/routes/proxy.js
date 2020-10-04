const express = require('express');
const router = express.Router();

const { getXkcdInfo } = require('../controllers/xkcd');

router.route('/xkcd').get(getXkcdInfo);

module.exports = router;