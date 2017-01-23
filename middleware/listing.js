var request = require("request");
var express = require("express");
var bodyParser = require("body-parser"); 
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var Listing = {};

var possibleErrors = [
    "There was a problem contacting the Ripple API",
    "Sorry, there weren't any beatmaps found :("
];

Listing.Beatmaps = function(req, res, next) {
    var query = req.body.query;
    var status = req.body.status;
    var mode =  req.body.mode;

    /*
        // Example Ripple API Call String
        http://storage.ripple.moe/api/search?query=lahphnya&status=4&mode=0  
    */

    // Match the form's Ranked Status to the Ripple API's
    var rankedStatusNumber;
    switch (status) {
        case "Ranked":
            rankedStatusNumber = 1;
            break;
        case "Qualified":
            rankedStatusNumber = 3;
            break;
        case "Loved":
            rankedStatusNumber = 4;
            break; 
        case "All Maps":
            rankedStatusNumber = null;
            break;                  
    }

    // Match the form's modes to the Ripple API's
    var modeNumber;
    switch (mode) {
        case "osu!":
            modeNumber = 0;
            break;
        case "Taiko":
            modeNumber = 1;
            break; 
        case "CTB":
            modeNumber = 2;
            break;
        case "Mania":
            modeNumber = 3;
            break;               
    }    

    // Build Base API call link
    var rippleAPI = 'http://storage.ripple.moe/api/search?query=' + query + '&mode=' + modeNumber + "&amount=100";

    // Append to string if they ended up choosing a ranked status
    if (rankedStatusNumber != null) {
        rippleAPI = rippleAPI.concat("&status=" + rankedStatusNumber);
    }

    // Request to Ripple API
    request (rippleAPI, function(error, response, body){
        // Parse data, and send it back to the listing page if no errors
        var data = JSON.parse(body);
        if (!error && response.statusCode == 200) {
            if (data['Sets'] != null) {
                // If beatmaps were successfully found
                var beatmaps = data['Sets'];
                res.render("osu", {beatmaps: beatmaps})
            } else {
                // No Beatmaps Found
                res.render("osu", {error: possibleErrors[1]});
            }
        } else {
            // Error Contacting Ripple API
            var elError = possibleErrors[0];
            res.render("osu", {error: possibleErrors[0]});
        }
    });

}


// Export
module.exports = Listing;