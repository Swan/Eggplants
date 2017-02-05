angular.module('eggplants', ['ngRoute'])
    .config(config);


// Route Configuration
function config($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: '/templates/landing.html',
            controller: LandingController,
            controllerAs: 'vm'
        })
}    