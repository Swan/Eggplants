const possibleLinks = require('../config/possiblelinks.json');
const request = require('request');
const helperFunctions = require('./util/helperfunctions.js');


// Direct Beatmap Downloads
module.exports.download = function(req, res, next) {

    let beatmap = req.body.beatmap;

    // First things first, find if the beatmap link is actually valid. (see: possiblelinks.json)
    let isValidLink = checkValidLink(beatmap);
    if (!isValidLink) 
        return helperFunctions.jsonNotValidLink(req, res);

    // Remove mode identifer from URL
    if (beatmap.includes("&")) 
        beatmap = beatmap.substring(0, beatmap.indexOf('&m'));
        

    /*
     * The following code is for /s/ links. 
     * There's nothing much to do but get the bsId from the link and attempt to downlaod.
     */

    if (beatmap.includes('/s/')) {

        let beatmapSetId = beatmap.substring(beatmap.indexOf("s/") + 2);

        if (beatmapSetId == "" || isNaN(beatmapSetId) || beatmapSetId.includes(' ')) 
                helperFunctions.jsonNotValidLink(req, res);   

        request("http://storage.ripple.moe/s/" + beatmapSetId, function(error, response, body){
            (!error && response.statusCode == 200) ? helperFunctions.downloadBeatmap(req, res, beatmapSetId) : helperFunctions.showJsonError(req, res);    
        });

    } 

    /*
     * The following code is for /b/ links. 
     * It's a bit more complex given that you have to convert the /b/:id to /s/:id
     * Then attempt to download
     */ 

    if (beatmap.includes("/b/")) {

        let beatmapId = beatmap.substring(beatmap.indexOf("b/") + 2);

        if (beatmapId == "" || isNaN(beatmapId) || beatmapId.includes(' ')) 
                helperFunctions.jsonNotValidLink(req, res);                    
            
        request("http://storage.ripple.moe/b/" + beatmapId, function(error, response, body){

            if (!error && response.statusCode == 200) {

                let data = JSON.parse(body);
                helperFunctions.downloadBeatmap(req, res, data.ParentSetID);

            } else {
                helperFunctions.showJsonError(req, res);
            }                

        });
    }

}


function checkValidLink(beatmap) {
     // Check if beatmap link meets the possibleLinks criteria
    for (let i=0; i < possibleLinks.criteria.length; i++) {
        if (beatmap.includes(possibleLinks.criteria[i])) { return true; } 
    }
}