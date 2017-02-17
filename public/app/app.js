angular.module('eggplants', ['ngRoute'])
    .config(config);


// Route Configuration
function config($routeProvider, $locationProvider, $httpProvider, $sceDelegateProvider) {

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
  
    // Remove #! from URL
    $locationProvider.html5Mode(true);

    $httpProvider.defaults.useXDomain = true;

    delete $httpProvider.defaults.headers.common['X-Requested-With'];    

    $sceDelegateProvider.resourceUrlWhitelist(['**']);
}    