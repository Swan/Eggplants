// Beatmap Link Criteria
var direct = require('../config/direct.json');

// Request package
var request = require('request');

// Create Empty Eggplants Object
var eggplants = {};


// Downloading beatmaps directly with eggplants.org/s/:id 
eggplants.setIdDownload = function(req, res, next) {

    // Grab BeatmapSetId From Link Param
   var beatmapSetId = req.params.id;

   // Run a check if the beatmap exists on Ripple
   request ("http://storage.ripple.moe/s/" + beatmapSetId, function(error, response, body){
       
       if (!error && response.statusCode == 200) {

            downloadBeatmap(req, res, beatmapSetId);

       } else {

            showJsonError(req, res);
       }
   });
}


// Download beatmaps directly with eggplants.org/b/:id
eggplants.beatmapIdDownload = function(req, res, next) {
    // Grab Beatmap Link by Itself
    var beatmapId = req.params.id;

    // Request to osu! API
    request ("http://storage.ripple.moe/b/" + beatmapId, function(error, response, body){

        if (!error & response.statusCode == 200) {

            // Grab Set ID
            var data = JSON.parse(body);
            var beatmapSetId = data['ParentSetID'];

            // Download
            downloadBeatmap(req, res, beatmapSetId);

        } else {

            showJsonError(req, res);

        }
    }); 
};


// ppy
eggplants.peppy = function(req, res) {
    res
        .status(200)
        .json({
            status: 200,
            name: "Dean Herbert",
            alias: "Peppy",
            description: "Lord and savior of the circle punching game called osu! If you've made it here, you are a champion."
        });
}


// If beatmap could not be downloaded
function showJsonError(req, res) {
        res
            .status(404)
            .json({
                status: 404,
                 error: "The beatmap you are trying to download could not be found."
            });
}

// Download Beatmap
function downloadBeatmap (req, res, beatmapSetId) {
        res
            .redirect('http://storage.ripple.moe/' + beatmapSetId + ".osz");
}


// Export
module.exports = eggplants;