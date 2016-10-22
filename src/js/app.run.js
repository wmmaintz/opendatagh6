/*!***************************************************************************
 *****************************************************************************
 **
 ** Filename    : app.run.js
 **
 *****************************************************************************
 ****************************************************************************/
(function () {
    'use strict';

angular
        .module('app')
        .run(
        [            '$rootScope', '$state', '$stateParams',
            function ($rootScope,   $state,   $stateParams) {
                /* It's very handy to add references to $state and $stateParams to the $rootScope
                ** so that you can access them from any scope within your applications.
                ** For example, <li ng-class='{ active: $state.includes('contacts.list') }'> will
                ** set the <li> to active whenever 'contacts.list' or one of its decendents is active.
                */
                
                $rootScope.state = $state;
                $rootScope.stateParams = $stateParams;

                $rootScope.pageLoaded = true;

                if(debug){
                    $rootScope.debug = debug;
                    $rootScope.endPoint = 'http://localhost:3000';
                } else {
                    $rootScope.endPoint = 'http://maintz.com';
                }    
            }
        ]);

    if(debug){
        console.log('       .run(["$rootScope","$state","$stateParams",function ($rootScope,$state,$stateParams) executed');
    }

}());

/*****************************************************************************
 ** END OF FILE - app.run.js
 ****************************************************************************/