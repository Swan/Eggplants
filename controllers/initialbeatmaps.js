const rippleAPI = require('rippleapi');

// This function will be used to get the initial beatmaps
// upon page load.
module.exports.getInitialBeatmaps = async (req, res) => {
    // We have the ability to set an offset here so that if the
    // user scrolls down to the bottom, we can search again and provide them
    // with more beatmaps.
    const offset = req.query.offset || 0;

    // Choose a random game mode between 1 and 4.
    const gameModes = ['osu', 'taiko', 'ctb', 'mania'];
    const randomGameMode = gameModes[Math.floor(Math.random() * (4 - 0))];

    // Get beatmaps from the Ripple API and return them.
    const response = await rippleAPI.searchBeatmaps('', randomGameMode, 'ranked', 100, offset);

    return res.status(200).json({ status: 200, gameMode: randomGameMode, beatmaps: response });
};