angular.module('eggplants', ['ngRoute'])
    .config(config);


// Route Configuration
function config($routeProvider, $httpProvider) {

    $routeProvider
        .when('/', {
            templateUrl: '/templates/landing.html',
            controller: LandingController,
            controllerAs: 'vm'
        })
        .otherwise({
            templateUrl: '/templates/landing.html',
            controller: LandingController,
            controllerAs: 'vm'
        })
  
}    