/*!***************************************************************************
 *****************************************************************************
 **
 ** Filename    : user.controller.js
 **
 *****************************************************************************
 ****************************************************************************/

(function () {
    'use strict';

    var userController = function ($scope) {
        
        if(debug){
            console.log('userController activated');
        }    

        $scope.items = [
            'user',
            'website'
        ];

    };

    angular
        .module('app')
        .controller('userController', [
            '$scope', 
            userController
        ]);

    if(debug){
        console.log('userController defined');
    }

}());

/*****************************************************************************
 ** END OF FILE - user.controller.js
 ****************************************************************************/
