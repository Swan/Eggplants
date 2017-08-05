const rippleAPI = require('rippleapi');
const _ = require('lodash');

// Acts as a proxy for Ripple's search API.
// Will go and fetch beatmaps based on a specific query
// and return them back as JSON.
module.exports.searchBeatmaps = async (req, res) => {
    try {
        const { query, mode, status, keys, offset } = req.query;

        if (!query) return res.status(422).json({ status: 422, error: 'No "query" parameter provided.' });
        if (!mode) return res.status(422).json({ status: 422, error: 'No "mode" parameter provided.' });
        if (!status) return res.status(422).json({ status: 422, error: 'No "status" parameter provided.' });

        const response = await rippleAPI.searchBeatmaps(query, mode, status, 100, offset);
        console.log(`[API] USER SEARCHED FOR DATA: Query: ${query} | Mode: ${mode} | Status: ${status} | Keys: ${keys} | Offset: ${offset}`);

        // Initialize the beatmaps array, we'll use to store the returned maps
        // and cut off any maps that don't have the correct key count (if mania)
        let beatmaps = response.Sets;
        if (mode === 'mania') beatmaps = getMatchedKeys(beatmaps, keys);

        // Order the beatmaps by its exact query match.
        beatmaps = orderByQueryMatch(beatmaps, query);

        return res.status(200).json({ status: 200, sets: beatmaps });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: 500, error: "Could not complete your request." });
    }
};

// Returns a new list of beatmaps ordered by whether
// there's a match of artist or title.
const orderByQueryMatch = (beatmaps, query) => {
    // Holds a list of beatmaps that has a query match.
    let queryMatched = [];
    // Holds a list of beatmaps that DON'T have a query match.
    let queryNotMatched = [];
    // Holds the final list of beatmaps to be returned.
    let orderedMaps = [];

    // Here we'll lowercase the query so we don't have any problems matching.
    query = query.toLowerCase();
    // Sometimes getMatchedKeys will return an undefined object in the array, (Unknown reason?)
    // so we'll remove them with lodash.
    beatmaps = _.compact(beatmaps);

    beatmaps.forEach((beatmap) => {
        if (beatmap.Title.toLowerCase().includes(query) ||
            beatmap.Artist.toLowerCase().includes(query) ||
            beatmap.Creator.toLowerCase().includes(query)){
                queryMatched.push(beatmap);
        } else {
            queryNotMatched.push(beatmap);
        }
    });

    // Populate the soon-to-be returned array with the query-matched beatmaps
    // first, then the not matched beatmaps.
    orderedMaps = orderedMaps.concat(queryMatched);
    orderedMaps = orderedMaps.concat(queryNotMatched);

    return orderedMaps;
};

// Loops through the list of maps and creates a
// new array with the exact list of keys the user
// requested. The Ripple API returns the key count
// as CS (Circle Size).
const getMatchedKeys = (beatmaps, keys) => {
    return beatmaps.map((beatmap) => {
        // Loop through that beatmap set's child maps and find matching keys.
        for (let i = 0; i < beatmap.ChildrenBeatmaps2.length; i++) {
             if (beatmap.ChildrenBeatmaps2[i].CS == keys) {
                 return beatmap;
             }
        }
    });
};