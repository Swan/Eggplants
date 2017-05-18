const express = require('express');
const router = express.Router();

const { getInitialBeatmaps } = require('../controllers/getinitialbeatmaps');
const { search } = require('../controllers/search');
const { directSetId, directBeatmapId } = require('../controllers/direct');
const authentication = require('../controllers/user/authentication');


// :)
router.get('/', (req, res) => {
    res.json({status: 200, message: '🍆'});
});

/*
 * Gets the initial beatmaps upon first loading the page. This will get a list of ranked osu! standard beatmaps
 */
router.get('/getinitialbeatmaps', getInitialBeatmaps);

/*
 * Gives the user the ability to search for new beatmaps
 * The user should specify a search query, ranked status, and game mode (also keys if selected mania).
 * Searches Ripple's API & returns the list of beatmaps in an organized fashion
 */
router.get('/search', search);

/*
 * Gives back the results from Ripple's API. It's slower, I know but I dealt with some issues along the way, and I couldn't be bothered.
 */
router.get('/direct/s', directSetId);
router.get('/direct/b', directBeatmapId);

/*
 * User
 */
router.post('/users/new', authentication.register);

module.exports = router;
