/*!***************************************************************************
 *****************************************************************************
 **
 ** Filename    : home.controller.js
 **
 *****************************************************************************
 ****************************************************************************/

(function () {
    'use strict';

    angular
        .module('app')
        .controller('homeController', [
                '$rootScope', 
        function($rootScope){

            var vm = $rootScope;
            
            if(debug){
                console.log('homeController activated');
            }    
            
            // Temporary values 
            // TODO: replace these with real login values;
            vm.loggedIn = true;
            vm.userName = 'bill@maintz.com';
            
            showCalenders();
            return vm;
        }
    ]);

    if(debug){
        console.log('homeController defined');
    }

}());

/*****************************************************************************
 ** END OF FILE - home.controller.js
 ****************************************************************************/
