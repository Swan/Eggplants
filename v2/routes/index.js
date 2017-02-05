var express = require('express');
var router = express.Router();

var eggplants = require('../controllers/eggplants.js');

router
    .route('/peppy')
    .get(eggplants.peppy);

module.exports = router;

    