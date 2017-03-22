const express = require('express');
const router = express.Router();
const getBeatmaps = require('../controllers/getbeatmaps.js');
const shareableLinks = require('../controllers/shareablelinks.js');
const direct = require('../controllers/direct.js');


router.post('/', direct.download);
router.get('/s/:setId', shareableLinks.setIdDownload);
router.get('/b/:beatmapId', shareableLinks.beatmapIdDownload);

  
/*
 *  API Routes - Used for rendering the JSON from Ripple's API to get beatmaps
 */    
router.get('/api/getInitialBeatmaps', getBeatmaps.getInitialBeatmaps);
router.get('/api/getNewBeatmaps/:search/:rankedStatus/:mode', getBeatmaps.getNewBeatmaps);

          
router.get('*', (req, res) => { res.redirect('/'); })  

module.exports = router;

    