// Dependencies
var express = require("express");
var router = express.Router();
var passport= require("passport");
var bodyParser = require("body-parser");
var request = require("request");
var flash = require("connect-flash");

// Use Dependencies
router.use(bodyParser.urlencoded({extended: true})); 
router.use(flash()); 
router.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.errorMessage = req.flash("error");
    res.locals.successMessage = req.flash("success");
    next();
})


// Root
router.get("/", function(req, res){

    // // Get starter beatmaps from the Ripple API for homepage listing
    // request("https://storage.ripple.moe/levbod/listing", function(error, response, body){
    //     if (!error && response.statusCode == 200) {
    //         var data = JSON.parse(body);
    //         
    //     }
    // });
    res.render("index");
});


// Handle POST request from osu!downloader
router.post("/direct", function(req, res){

    // osu! API Key
    var osuAPI = "";
    
    // Get beatmap link from form
    var beatmapLink = req.body.beatmap;

    // Check if the link is a valid osu! or new.ppy.sh link
    if (beatmapLink.includes("osu.ppy.sh/b/") || beatmapLink.includes("osu.ppy.sh/s/") || 
        beatmapLink.includes("new.ppy.sh/s/") || beatmapLink.includes("new.ppy.sh/b")  || 
        beatmapLink.includes("104.20.52.28/s/") || beatmapLink.includes("104.20.52.28/b/")) {
        
        // First run a check to see if the link contains a mode identifier. If it does, remove everything after it.
        if (beatmapLink.includes("&")) {
            var beatmapLink = beatmapLink.substring(0, beatmapLink.indexOf('&m'));
        }

        // Check if it is a beatmap id or a set id
        if (beatmapLink.includes("/s/")) {   

            // Check osu! to see if the beatmap exists. 
            var beatmapSetId = beatmapLink.substring(beatmapLink.indexOf("s/") + 2);

            // Search osu! to see if the beatmap exists.
            request("https://osu.ppy.sh/s/" + beatmapSetId, function(error, response, body){
                if (!error) {
                    if (body.includes("The beatmap you are looking for was not found!")) {
                        // Show flash alert displaying the beatmap id, and stating that it does not exist.
                    } else {
                        // Instead of Redirecting, download the beatmap and then give it to them -- This is just a temporary fix
                        res.redirect("https://storage.ripple.moe/" + beatmapSetId + ".osz");
                    }
                } 
            });

        } else if (beatmapLink.includes("/b/")) {
            
            // Grab Beatmap Id alone
            var beatmapId = beatmapLink.substring(beatmapLink.indexOf("b/") + 2);
            // Grab the set
            request ("https://osu.ppy.sh/api/get_beatmaps?k=" + osuAPI + "&b=" + beatmapId, function(error, response, body){
                if (!error & response.statusCode == 200) {
                    var data = JSON.parse(body);
                    var beatmapSetId = data[0]['beatmapset_id'];
                    res.redirect("https://storage.ripple.moe/" + beatmapSetId + ".osz");
                } else {
                    // Could not contact osu! API handler
                }
            });        
        }
    } else {
        // Invalid osu! link Handler
    }       
});


router.post("/", function(req, res){

    // Grab Form Data
    var query = req.body.query;
    var mode = req.body.mode;
    var status = req.body.status;
    
    // Create Ripple API call String
    // SAMPLE - https://storage.ripple.moe/levbod/listing?query=lahphnya&status=4

    // Match the Form's mode to the Ripple API mode
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
        default:
            modeNumber = -1;               
    }

    // Match the form's Ranked Status to the Ripple API's
    var rankedStatusNumber;
    switch (status) {
        case "Ranked":
            rankedStatusNumber = 0;
            break;
        case "Qualified":
            rankedStatusNumber = 3;
            break;
        case "Loved":
            rankedStatusNumber = 8;
            break; 
        case "All Maps":
            rankedStatusNumber = 4;
            break;
        default:
            rankedStatusNumber = 4;            
    }

    // Create API Query link
    var apiLink = 'https://storage.ripple.moe/levbod/listing?query=' + query + "&mode=" + modeNumber + "&status=" + rankedStatusNumber;

    // Request from Ripple API
    request (apiLink, function(error, response, body){

        if (!error && response.statusCode == 200) {

            // Parse JSON
            var beatmaps = JSON.parse(body);
            // Redirect and give back the beatmaps
            res.render("index", {beatmaps: beatmaps});
            
        } else {
            // Handle Error
            console.log("Error contacting the Ripple API")
        }

    });

});



// 404
router.get("*", function(req, res){
   res.redirect("back"); 
});

// Export
module.exports = router;