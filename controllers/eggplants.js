const possibleLinks = require('../config/possiblelinks.json');
const request = require('request');





// Direct Beatmap Downloads
module.exports.direct = function(req, res, next) {

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
                    res.redirect("http://storage.ripple.moe/" + beatmapSetId + ".osz");
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
                    res.redirect("http://storage.ripple.moe/" + beatmapSetId + ".osz");

                } else {
                    showJsonError(req, res);
                }                

            });

        }
    }

}


// Return Ripple's API call response when going to /api/getInitialBeatmaps
module.exports.getInitialBeatmaps = function(req, res) {

    request('http://storage.ripple.moe/api/search?amount=100&status=1', function(error, response, body) {

        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.json(data.Sets);
        }

    });
}


// Get search query information from LandingController & return Ripple's API response
module.exports.getNewBeatmaps = function(req, res) {


    var search = req.params.search;
    var mode = req.params.mode;
    var rankedStatus = req.params.rankedStatus;
    
    var apiRequest = 'http://storage.ripple.moe/api/search?query=' + search + '&mode=' + mode + "&amount=100"; 

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





