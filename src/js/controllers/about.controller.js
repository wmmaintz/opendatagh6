/*!***************************************************************************
 *****************************************************************************
 **
 ** Filename    : about.controller.js
 **
 *****************************************************************************
 ****************************************************************************/

(function () {
    'use strict';

    var aboutController = function ($scope) {
        
        if(debug){
            console.log('aboutController activated');
        }    

        $scope.items = [
            'about',
            'website'
        ];

    };

    angular
        .module('app')
        .controller('aboutController', [
            '$scope', 
            aboutController
        ]);

    if(debug){
        console.log('aboutController defined');
    }

}());

/*****************************************************************************
 ** END OF FILE - about.controller.js
 ****************************************************************************/
