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

   // Check if map exists on ripple & download it if it does
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


// Direct Beatmap Downloads
eggplants.direct = function(req, res, next) {

    var beatmap = req.body.beatmap;
    var isValidLink;

    // Run a check through each of the different possible links for a match
    for (var i=0; i < direct.criteria.length; i++) {

        if (beatmap.includes(direct.criteria[i])) {
            isValidLink = true;
            break;
        } else {
            isValidLink = false;
        }
    }

    // Show a JSON Error if the link isn't valid
    if (!isValidLink) {
        jsonNotValidLink(req, res);
    } else {

        // Remove mode identifier if it exists
        if (beatmap.includes("&")) {
            beatmap = beatmap.substring(0, beatmap.indexOf('&m'));
        }

        // Get setId from original link if it exists
        if (beatmap.includes('/s/')) {

            try {
                // Disassociate beatmapSetId
                var beatmapSetId = beatmap.substring(beatmap.indexOf("s/") + 2);

                // Check validity of :id
                if (beatmapSetId == "" || isNaN(beatmapSetId) || beatmapSetId.includes(' ')) {
                    jsonNotValidLink(req, res);                    
                }
            } catch (e) {
                jsonNotValidLink(req, res);
            }


            // Check Ripple API to see if the beatmap exists, download if it does
            request("http://storage.ripple.moe/s/" + beatmapSetId, function(error, response, body){

                // Download Beatmap
                if (!error && response.statusCode == 200) {
                    console.log("FOUND / BeatmapSetId - " + beatmapSetId + " on Ripple's API")
                    res.redirect("https://storage.ripple.moe/" + beatmapSetId + ".osz");
                } else {
                    showJsonError(req, res);
                }
            });

        } else if (beatmap.includes("/b/")) {

            // Get Beatmap Id
            try {
                var beatmapId = beatmap.substring(beatmap.indexOf("b/") + 2);
                if (beatmapId == "" || isNaN(beatmapId) || beatmapId.includes(' ')) {
                    jsonNotValidLink(req, res);                    
                }
            } catch (e) {
                jsonNotValidLink(req, res);
            }          


            // Check if Ripple has the map and download
            request("http://storage.ripple.moe/b/" + beatmapId, function(error, response, body){

                if (!error && response.statusCode == 200) {
                    var data = JSON.parse(body);
                    var beatmapSetId = data.ParentSetID;
                    console.log("FOUND / BeatmapSetId - " + beatmapSetId + " on Ripple's API");
                    res.redirect("https://storage.ripple.moe/" + beatmapSetId + ".osz");

                } else {
                    showJsonError(req, res);
                }                

            });

        }
    }

}


// Return Ripple's API call response when going to /api/getInitialBeatmaps
eggplants.getInitialBeatmaps = function(req, res) {

    request('https://storage.ripple.moe/api/search?amount=100', function(error, response, body) {

        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.json(data.Sets);
        }

    });
}


// Get search query information from LandingController & return Ripple's API response
eggplants.getNewBeatmaps = function(req, res) {


    var search = req.params.search;
    var mode = req.params.mode;
    var rankedStatus = req.params.rankedStatus;
    
    var apiRequest = 'https://storage.ripple.moe/api/search?query=' + search + '&mode=' + mode + "&amount=100"; 

    if (rankedStatus != 'null') {
        apiRequest = apiRequest.concat("&status=" + rankedStatus);
    }

    console.log(apiRequest);
    
    request(apiRequest, function(error, response, body) {

        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.json(data);
        }

    });


};

// --- HELPER FUNCTIONS ---

// If beatmap could not be downloaded
function showJsonError(req, res) {
     res
        .status(404)
        .json({
            status: 404,
            error: "The beatmap you are trying to download could not be found."
        });
}

// If invalid direct link
function jsonNotValidLink(req, res) {
    res
        .status(404)
        .json({status: 404, error: "The link you have entered is not valid."})   
}

// Download Beatmap
function downloadBeatmap (req, res, beatmapSetId) {
    res.redirect('http://storage.ripple.moe/' + beatmapSetId + ".osz");
}


// Export
module.exports = eggplants;