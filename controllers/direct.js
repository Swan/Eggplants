const possibleLinks = require('../config/possiblelinks.json');
const axios = require('axios');
const {showJsonError, downloadBeatmap} = require('./utils/helperfunctions');


// Direct Beatmap Downloads
let directDownload = (req, res, next) => {

    let beatmap = req.body.beatmap;

    // First things first, find if the beatmap link is actually valid. (see: possiblelinks.json)
    let isValidLink = checkValidLink(beatmap);
    if (!isValidLink) 
        return showJsonError(req, res);

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
                showJsonError(req, res);   

        axios.get('http://storage.ripple.moe/s/' + beatmapSetId)
            .then((response) => {
                downloadBeatmap(req, res, beatmapSetId);
            })
            .catch((error)  => {
                showJsonError(req, res);
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
                showJsonError(req, res);     


        axios.get('https://storage.ripple.moe/b/' + beatmapId)
            .then((response) => {
                let data = response.data;
                downloadBeatmap(req, res, data.ParentSetID);
            })
            .catch((error) => {
                console.log(error);
                showJsonError(req, res);
            });
        
    }

}


let checkValidLink = beatmap => {
     // Check if beatmap link meets the possibleLinks criteria
    for (let i=0; i < possibleLinks.criteria.length; i++) {
        if (beatmap.includes(possibleLinks.criteria[i])) { return true; } 
    }
}

module.exports = {
    directDownload
};