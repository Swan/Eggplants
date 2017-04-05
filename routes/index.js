const express = require('express');
const router = express.Router();
const {getInitialBeatmaps, getNewBeatmaps} = require('../controllers/getbeatmaps');
const {setIdDownload, beatmapIdDownload} = require('../controllers/shareablelinks');
const {directDownload} = require('../controllers/direct');


router.post('/', directDownload);
router.get('/s/:setId', setIdDownload);
router.get('/b/:beatmapId', beatmapIdDownload);

  
/*
 *  API Routes - Used for rendering the JSON from Ripple's API to get beatmaps
 */    
router.get('/api/getInitialBeatmaps', getInitialBeatmaps);
router.get('/api/getNewBeatmaps/:search/:rankedStatus/:mode', getNewBeatmaps);


/*
 *   Login/Sign Up Routes
 */
router.post('/login', (req, res) => {
    res.json({username: req.body.username, password: req.body.password});
});

router.get('*', (req, res) => { res.redirect('/'); })  

module.exports = router;

    