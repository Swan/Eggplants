angular.module('eggplants')
    .controller('LandingController', LandingController);

function LandingController($http, eggplantsFactory) {

    var vm = this;

    // Get beatmaps upon first loading the page
    eggplantsFactory.getIniitalBeatmaps().then(function(response){
        vm.initialBeatmaps = response.data.Sets;
    })


    // Grabs user queried beatmaps
    vm.getNewBeatmaps = function() {

        // Put form data into variables
        var searchQuery = vm.search;
        var rankedStatus = vm.rankedStatus;
        var gameMode = vm.gameMode;

        // Match the form's ranked status to the Ripple APi's.
        var rankedStatusNumber;
        switch (rankedStatus) {

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
        switch (gameMode) {

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

        // Build API request string
        var apiRequest = 'http://storage.ripple.moe/api/search?query=' + searchQuery + '&mode=' + modeNumber + "&amount=100"; 

        // Append to string it they've chosen a ranked status - If they haven't it'll grab all of them
        if (rankedStatusNumber != null) {
            apiRequest = apiRequest.concat("&status=" + rankedStatusNumber);
        }
        
        console.log(apiRequest);

        // Finally, request the new beatmaps from the Ripple API
        eggplantsFactory.getNewBeatmaps(apiRequest).then(function(response){
            vm.newBeatmaps = response.data.Sets;
        });

    }

    
}    