const express = require('express');
const router = express.Router();
const eggplants = require('../controllers/eggplants.js');
const shareableLinks = require('../controllers/shareablelinks.js');


router.get('/', eggplants.direct);
router.get('/s/:setId', shareableLinks.setIdDownload);
router.get('/b/:beatmapId', shareableLinks.beatmapIdDownload);

  
/*
 *  API Routes - Used for rendering the JSON from Ripple's API to get beatmaps
 */    
router.get('/api/getInitialBeatmaps', eggplants.getInitialBeatmaps);
router.get('/api/getNewBeatmaps/:search/:rankedStatus/:mode', eggplants.getNewBeatmaps);

          
router.get('*', (req, res) => { res.redirect('/'); })  

module.exports = router;

    