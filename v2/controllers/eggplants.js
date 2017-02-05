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

            res
                .redirect('http://storage.ripple.moe/' + beatmapSetId + ".osz");

       } else {

            res
                .status(404)
                .json({
                    status: 404,
                    error: "The beatmap you are trying to download could not be found."
                });
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

            // Parse data that comes back
            var data = JSON.parse(body);

            // Grab Beatmap Set ID from API
            var beatmapSetId = data['ParentSetID'];

            // Download Beatmap
            res
                .redirect("http://storage.ripple.moe/" + beatmapSetId + ".osz");

        } else {

            // If beatmap does not exist or there was another error
            res
                .status(404)
                .json({
                    status: 404,
                    error: "The beatmap you are trying to download could not be found."
                })
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

// Export
module.exports = eggplants;