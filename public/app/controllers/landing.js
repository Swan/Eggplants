angular.module('eggplants')
    .controller('LandingController', LandingController);

function LandingController($http, eggplantsFactory) {

    var vm = this;

    // Get beatmaps upon first loading the page
    eggplantsFactory.getIniitalBeatmaps().then(function(response){
        vm.initialBeatmaps = response.data;
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


        // Get new beatmaps from API
        eggplantsFactory.getNewBeatmaps(searchQuery, rankedStatusNumber, modeNumber).then(function(response){
            vm.newBeatmaps = response.data.Sets;
            vm.newBeatmapsData = response.data;
        });
        
    }

    
}    