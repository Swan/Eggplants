angular.module('eggplants').factory('eggplantsFactory', eggplantsFactory);


// In the event that we do have a databse and we need to have the front-end communicate with the backend.
function eggplantsFactory($http) {

    return {
        getIniitalBeatmaps: getIniitalBeatmaps,
        getNewBeatmaps: getNewBeatmaps
    };


    // On page load, it will automaitcally grab the first listed beatmaps from the Ripple API
    function getIniitalBeatmaps() {
       return $http.get('http://storage.ripple.moe/api/search?amount=100').then(complete).catch(failed);
    }

    // When the user submits the search form, this will get new beatmaps from the Ripple API
    function getNewBeatmaps(apiRequestLink) {
        return $http.get(apiRequestLink).then(complete).catch(failed);
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
