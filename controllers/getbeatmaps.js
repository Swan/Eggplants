const possibleLinks = require('../config/possiblelinks.json');
const axios = require('axios');

// Return Ripple's API call response when going to /api/getInitialBeatmaps
let getInitialBeatmaps = (req, res) => {

    axios.get('http://storage.ripple.moe/api/search?amount=100&status=1')
        .then((response) => {
            res.json(response.data.Sets);
        })
        .catch((err) => {
            res
                .status(400)
                .json({status: 400, error: "Bad request, please tell this to a developer."});
        });
}


// Get search query information from LandingController & return Ripple's API response
let getNewBeatmaps = (req, res) => {


    let search = req.params.search;
    let mode = req.params.mode;
    let rankedStatus = req.params.rankedStatus;
    
    let apiRequest = 'http://storage.ripple.moe/api/search?query=' + search + '&mode=' + mode + "&amount=100"; 

    if (rankedStatus != 'null') {
        apiRequest = apiRequest.concat("&status=" + rankedStatus);
    }

    console.log("User has searched: " + search + " with ranked status: " + rankedStatus + " and mode: " + mode);
    

    axios.get(apiRequest)
        .then((response) => {
            res.json(response.data)
        })
        .catch((err) => {
            res
                .status(400)
                .json({status: 400, error: "Bad request, please tell this to a developer."})
        });
        
};

module.exports = {
    getInitialBeatmaps,
    getNewBeatmaps
}





