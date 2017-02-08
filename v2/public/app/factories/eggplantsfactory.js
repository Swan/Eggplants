angular.module('eggplants')
    .factory('eggplantsFactory', eggplantsFactory);


// In the event that we do have a databse and we need to have the front-end communicate with the backend.
function eggplantsFactory($http) {

    return {
        getIniitalBeatmaps: getIniitalBeatmaps
    };


    function getIniitalBeatmaps() {

        return $.getJSON('http://storage.ripple.moe/api/search?')
            .done(complete)
            .catch(failed)

    }


    
    // Success
    function complete(response) {
        return response;
    }

    // Catch
    function failed(error) {
        console.log(error.statusText);
    }    

}
