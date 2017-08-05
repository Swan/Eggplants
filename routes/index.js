const express = require('express');
const router = express.Router();

const home = require('../controllers/home');
const beatmapId = require('../controllers/beatmapid');
const beatmapSetId = require('../controllers/beatmapsetid');
const search = require('../controllers/search');
const initialBeatmaps = require('../controllers/initialbeatmaps');

router
    .route('/')
    .get(home.renderHome);

router
    .route('/api/b/:id')
    .get(beatmapId.checkBeatmapIdExists);

router
    .route('/api/s/:id')
    .get(beatmapSetId.checkBeatmapSetIdExists);

router
    .route('/api/search')
    .get(search.searchBeatmaps);

router
    .route('/api/initialbeatmaps')
    .get(initialBeatmaps.getInitialBeatmaps);

router
    .route('*')
    .get(home.renderHome);


module.exports = router;