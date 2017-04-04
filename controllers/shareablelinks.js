const axios = require('axios');
const {showJsonError, downloadBeatmap} = require('./utils/helperfunctions');

// Downloading beatmaps directly with eggplants.org/s/:id 
let setIdDownload = (req, res, next) => {

    axios.get('http://storage.ripple.moe/s/' + req.params.setId)
        .then(response => {
            downloadBeatmap(req, res, req.params.setId);
        })
        .catch(err => {
            showJsonError(req, res);
        });

}

// Download beatmaps directly with eggplants.org/b/:id
let beatmapIdDownload = (req, res, next) => {

    axios.get('http://storage.ripple.moe/b/' + req.params.beatmapId)
        .then(response => {
            downloadBeatmap(req, res, response.data['ParentSetID']);
        })
        .catch(err => {
            showJsonError(req, res);
        });
        
};

module.exports = {
    setIdDownload,
    beatmapIdDownload
};