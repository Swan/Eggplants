const axios = require('axios');

// Responsible for getting the data from a user's search and returning a new list of beatmaps
const search = (req, res) => {
    // Grab all of the user's search query results
    const searchQuery = req.query.query;
    const mode = req.query.mode;
    const rankedStatus = req.query.status;
    const maniaKeys = req.query.keys;
    const offset = req.query.offset; // TODO: Would need to increase the offset by 100 each time. 101, 201, 301 etc, for infinite scrolling

    let url = `http://storage.ripple.moe/api/search?query=${searchQuery}&mode=${mode}&amount=100&offset=${offset}`;
    if (rankedStatus != 'null') url = url.concat(`&status=${rankedStatus}`);

    console.log(`Eggplants user has searched | Query: ${searchQuery} | Mode: ${mode} | Ranked Status: ${rankedStatus} | Mania Keys: ${maniaKeys} | Offset: ${offset}`);

    axios.get(url)
        .then((response) => {
            if (response.data.Sets != null) { 
                // If the mode isn't mania, just sort them by exact matches and then return it             
                if (mode != 3) {
                     let beatmaps = getExactMatch(response.data.Sets, searchQuery);                      
                    return res.status(200).json(beatmaps);
                } else {
                    // If the game mode is mania, only return the results with the correct amount of keys, then sort by exact matches
                    beatmaps = getKeyResults(response.data.Sets, maniaKeys);
                    beatmaps = getExactMatch(beatmaps, searchQuery);                 
                    return res.status(200).json(beatmaps);
                }
            // Return null, if there are no beatmaps
        } else {
            return res.status(200).json(null);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({status: 400, error: 'Bad Request'});
        })

};

// Since Ripple's API doesn't return exact matches in the correct order, we'll do it here.
const getExactMatch = (beatmaps, searchQuery) => {
    let matchedBeatmaps = [];
    let unmatchedBeatmaps = [];
    let newBeatmaps = [];

    beatmaps.forEach((beatmap) => {
    
        if (beatmap.Title.toLowerCase().includes(searchQuery.toString().toLowerCase()) || 
            beatmap.Artist.toLowerCase().includes(searchQuery.toString().toLowerCase()) || 
            beatmap.Creator.toLowerCase().includes(searchQuery.toString().toLowerCase())) {
            matchedBeatmaps.push(beatmap);
        } else {
            unmatchedBeatmaps.push(beatmap);
        }

    });

    newBeatmaps = newBeatmaps.concat(matchedBeatmaps);
    newBeatmaps = newBeatmaps.concat(unmatchedBeatmaps);

    return newBeatmaps;
};

// Only return beatmaps with the correct amount of mania keys
const getKeyResults = (beatmaps, keys) => {
    let newBeatmaps = [];
    beatmaps.forEach((beatmap) => {
        try {
            for (let i = 0; i <= beatmap.ChildrenBeatmaps2.length; i++) { 
                if (beatmap.ChildrenBeatmaps2[i].CS == keys) {
                    newBeatmaps = newBeatmaps.concat(beatmap);
                    break;
                }
            }    
        } catch (e) {}
    });
    return newBeatmaps;    
};

module.exports = { search };