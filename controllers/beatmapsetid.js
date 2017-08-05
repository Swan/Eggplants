const rippleAPI = require('rippleapi');

module.exports.checkBeatmapSetIdExists = async (req, res) => {
    try {
        const beatmapSet = await rippleAPI.getBeatmapSetInfo(req.params.id);
        return res.status(200).json({ status: 200, beatmapSet });
    } catch (err) {
        return res.status(404).json({ status: 404, error: 'The beatmapSetId you have entered was not found.' });
    }
};