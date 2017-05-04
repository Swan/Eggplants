const axios = require('axios');

// Renders the json for /s/ links from Ripple's API
const directSetId = (req, res) => {
    let beatmapSetId = req.query.id;
    
    axios.get(`https://storage.ripple.moe/s/${beatmapSetId}`)
        .then((response) => {
            res.json({data: response.data});
        })
        .catch((err) => {
            res.json({status: 400, error: 'Bad Request'});
        })
};

// Renders the json for /b/ links from Ripple's API
const directBeatmapId = (req, res) => {
    let beatmapId = req.query.id;
    
    axios.get(`https://storage.ripple.moe/b/${beatmapId}`)
        .then((response) => {
            res.json({data: response.data});
        })
        .catch((err) => {
            res.json({status: 400, error: 'Bad Request'});
        })
};

module.exports = { directSetId, directBeatmapId };