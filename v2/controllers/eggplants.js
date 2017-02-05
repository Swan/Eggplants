// Beatmap Link Criteria
var direct = require('../config/direct.json');

// Request package
var request = require('request');

// Create Empty Eggplants Object
var eggplants = {};


eggplants.setIdDownload = function(req, res, next) {

    // Grab BeatmapSetId From Link Param
   var beatmapSetId = req.params.id;

   // Run a check if the beatmap exists on Ripple
   request ("https://storage.ripple.moe/" + beatmapSetId + ".osz", function(error, response, body){
       if (!error) {
           // If beatmap not found on Ripple's mirror
           if (body.includes("That beatmap could not be found :(")) {

               res
                    .status(404)
                    .json({
                        status: 404,
                        beatmapSetId: beatmapSetId,
                        error: "The beatmap you are trying to download could not be found."
                    });
           } else {
               // Download Beatmap
               res.redirect("https://storage.ripple.moe/" + beatmapSetId + ".osz");
           }
       }
   });

}







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