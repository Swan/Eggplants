angular.module('eggplants')
    .controller('LandingController', LandingController);

function LandingController($route, $routeParams, eggplantsFactory) {

    var vm = this;

    eggplantsFactory.getIniitalBeatmaps().then(function(response){
        console.log(response);
    });


    
}    