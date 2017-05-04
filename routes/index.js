const express = require('express');
const router = express.Router();

const { getInitialBeatmaps } = require('../controllers/getinitialbeatmaps');
const { setIdDownload } = require('../controllers/setid');
const { beatmapIdDownload } = require('../controllers/beatmapid');

/* 
 * Gives the user the ability to download and share beatmaps.
 * https://eggplants.org/s/320118 | This should download: "Reol - No Title"
 * https://eggplants.org/b/736215 | This should download: "Panda Eyes & Teminite - Highscore"
 */
router.get('/s/:setId', setIdDownload);
router.get('/b/:beatmapId', beatmapIdDownload);

module.exports = router;