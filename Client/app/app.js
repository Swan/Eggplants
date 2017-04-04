angular.module('eggplants', ['ngRoute'])
    .config(config);


// Route Configuration
function config($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl: '/templates/landing.html',
            controller: LandingController,
            controllerAs: 'vm'
        })
        .when('/test', {
            templateUrl: '/templates/landing.html',
            controller: LandingController,
            controllerAs: 'vm'
        })        
        .otherwise({
            templateUrl: '/templates/landing.html',
            controller: LandingController,
            controllerAs: 'vm'
        })
  
    // Remove #! from URL
    $locationProvider.html5Mode(true);

}    