var express = require('express');
var router = express.Router();

var eggplants = require('../controllers/eggplants.js');

// Downloading via /s/ links
router
    .route('/s/:id')
    .get(eggplants.setIdDownload);

// Download via /b/ links
router
    .route('/b/:id')
    .get(eggplants.beatmapIdDownload);

// Root
router
    .route('/')
    .post(eggplants.direct);
    
router.get('*', function(req, res){
    res.redirect('/')
})          


module.exports = router;

    