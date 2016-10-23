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

                /* client */
                .state('client', {
                    controller: 'clientController',
                    templateUrl: 'partials/client/client.html',
                    url: '/client'
                })

                /* client2 */
                .state('client2', {
                    controller: 'clientController',
                    templateUrl: 'partials/client/client2.html',
                    url: '/client2'
                })

                /* addClient */
                .state('addClient', {
                    controller: 'clientController',
                    templateUrl: 'partials/client/addClient.html',
                    url: '/addClient'
                })

                /* volunteers */
                .state('volunteer', {
                    controller: 'volunteerController',
                    templateUrl: 'partials/volunteer/volunteer.html',
                    url: '/volunteer'
                })

                /* addVolunteer */
                .state('addVolunteer', {
                    controller: 'volunteerController',
                    templateUrl: 'partials/volunteer/addVolunteer.html',
                    url: '/addVolunteer'
                })

                /* sample */
                .state('sample', {
                    controller: 'sampleController',
                    templateUrl: 'partials/sample/sample.html',
                    url: '/sample'
                })

                /* sample */
                .state('sample2', {
                    controller: 'sampleController',
                    templateUrl: 'partials/sample/sample2.html',
                    url: '/sample2'
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
                    .when('/client/:clientName', '/partials/client/:id')
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