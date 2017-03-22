const request = require('request');
const helperFunctions = require('../util/helperfunctions.js');

// Downloading beatmaps directly with eggplants.org/s/:id 
module.exports.setIdDownload = function(req, res, next) {

   request ("http://storage.ripple.moe/s/" + req.params.setId, (error, response, body) => {
       (!error && response.statusCode == 200) ? helperFunctions.downloadBeatmap(req, res, req.params.setId) : helperFunctions.showJsonError(req, res);
   });

}

// Download beatmaps directly with eggplants.org/b/:id
module.exports.beatmapIdDownload = function(req, res, next) {

    request ("http://storage.ripple.moe/b/" + req.params.beatmapId, function(error, response, body){

        if (!error & response.statusCode == 200) {

            let data = JSON.parse(body);
            helperFunctions.downloadBeatmap(req, res, data['ParentSetID']);

        } else {
            helperFunctions.showJsonError(req, res);
        }

    }); 

};