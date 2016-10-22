/*!***************************************************************************
 *****************************************************************************
 **
 ** Filename    : app.config.js
 **
 *****************************************************************************
 ****************************************************************************/
(function () {
    'use strict';

    // Navigation is supplied via the following ui-router section
    // 
    angular
        .module('app')
        .config( [   '$urlRouterProvider', '$stateProvider',
            function ($urlRouterProvider,   $stateProvider) {
                
                $stateProvider

                // url - matches the ui-sref on the index.html page
                // templateUrl - matches the location of the partial html file
                // controller - matches the name of the controller associated with this page
                // service - identifies the service used to get the data needed for this page.
                //
                // To be displayed on main screen:
                // $state          = {{ $state.current.name }}
                // $stateParams    = {{ $stateParams }}
                // $state full url = {{ $state.$current.url.source }}
                // $stateProvider  = {{ $stateProvider }}
                
                /* Home */
                .state('home', {
                    controller: 'homeController',
                    templateUrl: 'partials/home/home.html',
                    url: '/home'
                })

                /* facilities */    
                .state('facility', {
                    controller: 'facilityController',
                    templateUrl: 'partials/facility/facility.html',
                    url: '/facility'
                })

                /* homeless */
                .state('homeless', {
                    controller: 'homelessController',
                    templateUrl: 'partials/homeless/homeless.html',
                    url: '/homeless'
                })

                /* volunteers */
                .state('volunteer', {
                    controller: 'volunteerController',
                    templateUrl: 'partials/volunteer/volunteer.carousel.html',
                    url: '/volunteer'
                })


                /* Register */
                .state('register', {
                    controller: 'userController',
                    templateUrl: 'partials/account/register.html',
                    url: '/register'
                })

                /* Login */
                .state('login', {
                    controller: 'userController',
                    templateUrl: 'partials/account/login.html',
                    url: '/login'
                })

                /* Logout */
                .state('logout', {
                    templateUrl: 'partials/account/logout.html',
                    url: '/logout'
                });

                $urlRouterProvider
                    /*
                    ** The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
                    ** Here we are just setting up some convenience urls.
                    */
                    .when('/facility/:facilityName', '/partials/facility/:id')
                    .when('/volunteer/:volunteerName', '/partials/volunteer/:id')
                    .when('/homeless/:homelessName', '/partials/homeless/:id')
                    /*
                    ** If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
                    */
                    .otherwise('/home');

            }
        ]);

    if(debug){
        console.log('       .config(["$urlRouterProvider", "$stateProvider"]) defined');
    }


}());

/*****************************************************************************
 ** END OF FILE - app.config.js
 ****************************************************************************/