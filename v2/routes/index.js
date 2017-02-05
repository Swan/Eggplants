var express = require('express');
var router = express.Router();

var eggplants = require('../controllers/eggplants.js');

router
    .route('/peppy')
    .get(eggplants.peppy);

// Downloading via /s/ links
router
    .route('/s/:id')
    .get(eggplants.setIdDownload);

// Download via /b/ links
router
    .route('/b/:id')
    .get(eggplants.setIdDownload);           

module.exports = router;

    