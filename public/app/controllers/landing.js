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
        var keyCount = vm.keyCount;
        console.log(keyCount);

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

            if (modeNumber == 3) {
                beatmaps = [];
                response.data.Sets.forEach((beatmap) => {
                    if (beatmap.ChildrenBeatmaps2[0].CS == keyCount) {
                        beatmaps = beatmaps.concat(beatmap);
                        
                    }        
                });

                console.log(beatmaps)

                vm.newBeatmaps = beatmaps;

            } else {
                vm.newBeatmaps = response.data.Sets;
            }
            
        });
        
    }

    
}    