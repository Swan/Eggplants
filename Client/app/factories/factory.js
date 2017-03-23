angular.module('eggplants').factory('factory', factory);


function factory($http) {

    return {
        getIniitalBeatmaps: getIniitalBeatmaps,
        getNewBeatmaps: getNewBeatmaps
    };


     /*
      * @description: Upon page load, it goes and gets a list of initial beatmaps to display.
      */   
    function getIniitalBeatmaps() {
       return $http.get('/api/getInitialBeatmaps').then(complete).catch(failed);
    }

     /*
      * @description: Goes and gets the Ripple API JSON response from the /api/getNewBeatmaps/:search/:rankedStatus/:mode route
      */   
    function getNewBeatmaps(search, rankedStatus, mode) {
        return $http.get('/api/getNewBeatmaps/' + search + "/" + rankedStatus + "/" + mode).then(complete).catch(failed);
    }

    function complete(response) {
        console.log(response);
        return response;
    }

    function failed(error) {
        console.log(error.statusText);
    }    

}

