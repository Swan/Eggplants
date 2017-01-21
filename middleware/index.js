var request = require("request");
var express = require("express");
var bodyParser = require("body-parser"); 
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// osu! API Key
var osuAPI = "";

// Contains a list of all the possible beatmap links
var beatmapLinkCriteria = [
    "osu.ppy.sh/b/",
    "osu.ppy.sh/s/",
    "new.ppy.sh/s/",
    "new.ppy.sh/b/",
    "104.20.52.28/s/",
    "104.20.52.28/b/",
];

// Create MW Obj
var Eggplants = {};


// For downloading via link
Eggplants.Direct = function(req, res, next)
{
    // Check validity of beatmap link
    beatmapLinkCriteria.forEach(function(link){

        // Grab Original Beatmap Link
        var beatmapLink = req.body.beatmap;

        if (beatmapLink.includes(link)) {

            // Remove mode identifier if it exists in the link
            if (beatmapLink.includes("&")) {
                var beatmapLink = beatmapLink.substring(0, beatmapLink.indexOf('&m'));
            } 

            // Check if the original link was a set
            if (beatmapLink.includes("/s/")) {
                // Disassociate set id
                try {
                    var beatmapSetId = beatmapLink.substring(beatmapLink.indexOf("s/") + 2);
                } catch (e) {
                    res.render("index"); 
                    return;            
                }

                // Check to see if the beatmap exists, and download if it does.
                request ("https://storage.ripple.moe/" + beatmapSetId + ".osz", function(error, response, body) {
                    if (!error) {
                        if (body.includes("That beatmap could not be found :(") || body.includes("404 Not Found")) {
                            res.render("index"); 
                        } else {
                            // Download Beatmap
                            res.redirect("https://storage.ripple.moe/" + beatmapSetId + ".osz");
                        }
                    }
                });    

            // If it's not a set, but rather a beatmap link    
            } else if (beatmapLink.includes("/b/")) {
                try {
                    // Dissasociate beatmap id
                    var beatmapId = beatmapLink.substring(beatmapLink.indexOf("b/") + 2);  
                } catch (e) {
                    res.render("index");
                    return;
                }
 
                // Convert Beatmap Id to Set Id
                request ("https://osu.ppy.sh/api/get_beatmaps?k=" + osuAPI + "&b=" + beatmapId, function(error, response, body){
                    if (!error & response.statusCode == 200) {
                        var data = JSON.parse(body);
                        try {
                            var beatmapSetId = data[0]['beatmapset_id'];
                        } catch (e) {
                            res.redirect("index");
                            return;
                        }

                        // Request to Ripple to see if the beatmap is actually found
                        request ("https://storage.ripple.moe/" + beatmapSetId + ".osz", function(error, response, body) {
                            if (!error) {
                                if (body.includes("That beatmap could not be found :(") || body.includes("404 Not Found")) {
                                    res.render("index");
                                } else {
                                    // Download Beatmap
                                    res.redirect("https://storage.ripple.moe/" + beatmapSetId + ".osz");
                                }
                            }
                        });                                               
                    } else {
                        // ERROR: Could not Contact The osu! API
                    }
                });                               
            }
        }
    });
}


// For downloading & sharing via BeatmapSetId
Eggplants.SetIdDownload = function(req, res, next) {
    // Grab Id Link By Itself
   var beatmapSetId = req.params.id;

   request ("https://storage.ripple.moe/" + beatmapSetId + ".osz", function(error, response, body){
       if (!error) {
           if (body.includes("That beatmap could not be found :(")) {
               res.send("Sorry, Beatmap Not Found");
           } else {
               // Download Beatmap
               res.redirect("https://storage.ripple.moe/" + beatmapSetId + ".osz");
           }
       }
   });
}

// For downloading & sharing via beatmapId
Eggplants.BeatmapIdDownload = function(req, res, next) {
    // Grab Beatmap Link by Itself
    var beatmapId = req.params.id;
    // Convert Beatmap Id to Set Id
    request ("https://osu.ppy.sh/api/get_beatmaps?k=" + osuAPI + "&b=" + beatmapId, function(error, response, body){
        if (!error & response.statusCode == 200) {
            var data = JSON.parse(body);
            var beatmapSetId = data[0]['beatmapset_id'];
            // Request to Ripple to see if the beatmap is actually found
            request ("https://storage.ripple.moe/" + beatmapSetId + ".osz", function(error, response, body) {
                if (!error) {
                    if (body.includes("That beatmap could not be found :(")) {
                        res.send("Sorry, Beatmap Not Found");                         
                    } else {
                        // Download Beatmap
                        res.redirect("https://storage.ripple.moe/" + beatmapSetId + ".osz");
                    }
                }
            });                                               
        } else {
            // ERROR: Could not Contact The osu! API
        }
    }); 

};

// Export
module.exports = Eggplants;