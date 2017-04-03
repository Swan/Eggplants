const request = require('request');
const {showJsonError, jsonNotValidLink, downloadBeatmap} = require('./utils/helperfunctions');

// Downloading beatmaps directly with eggplants.org/s/:id 
let setIdDownload = (req, res, next) => {

   request ("http://storage.ripple.moe/s/" + req.params.setId, (error, response, body) => {
       (!error && response.statusCode == 200) ? downloadBeatmap(req, res, req.params.setId) : showJsonError(req, res);
   });

}

// Download beatmaps directly with eggplants.org/b/:id
let beatmapIdDownload = (req, res, next) => {

    request ("http://storage.ripple.moe/b/" + req.params.beatmapId, function(error, response, body){

        if (!error & response.statusCode == 200) {

            let data = JSON.parse(body);
            downloadBeatmap(req, res, data['ParentSetID']);

        } else {
            showJsonError(req, res);
        }

    }); 

};

module.exports = {
    setIdDownload,
    beatmapIdDownload
};