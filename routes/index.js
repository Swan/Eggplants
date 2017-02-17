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
    
<<<<<<< HEAD
router.get('*', function(req, res){
    res.redirect('/')
})          
=======
router
    .route('/api/getInitialBeatmaps')
    .get(eggplants.getInitialBeatmaps);  
          
router
    .route('/api/getNewBeatmaps/:search/:rankedStatus/:mode')
    .get(eggplants.getNewBeatmaps);          

router.get('*', function(req, res){
    res.redirect('/');
})    
>>>>>>> cb9eb50f7a95190a5242464a501432e4f8df4eaf


module.exports = router;

    