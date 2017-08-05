const rippleAPI = require('rippleapi');

module.exports.checkBeatmapIdExists = async (req, res) => {
    try {
        const beatmap = await rippleAPI.getBeatmapInfo(req.params.id);
        return res.status(200).json({ status: 200, beatmap });
    } catch (err) {
        return res.status(404).json({ status: 404, error: 'The beatmapId you have entered was not found.' });
    }
};