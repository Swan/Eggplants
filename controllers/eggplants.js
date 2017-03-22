const possibleLinks = require('../config/possiblelinks.json');
const request = require('request');








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





