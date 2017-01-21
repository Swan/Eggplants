    // // Get starter beatmaps from the Ripple API for homepage listing
    // request("https://storage.ripple.moe/levbod/listing", function(error, response, body){
    //     if (!error && response.statusCode == 200) {
    //         var data = JSON.parse(body);
    //         res.render("index", {starter_maps: data});
    //     }
    // });

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