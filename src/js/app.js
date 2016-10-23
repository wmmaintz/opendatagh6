/*****************************************************************************
 **
 ** @ngdoc overview
 ** @name app.js
 **
 ** @description
 ** main AngularJS application definition file - loads all plugins that will 
 ** be a part of the module.
 **
 ****************************************************************************/
    
// Global debug flag (passed to other modules)
var debug = true;

(function () {
    'use strict';

    // Define main module.
    var ngApp = angular
        .module('app', 
            [
                'ngAnimate',
                'ngResource',
                'ngTouch',
                'ui',
                'ui.bootstrap',
                'ui.bootstrap.carousel',
                'ui.bootstrap.progressbar',
                'ui.grid',
                'ui.grid.edit',
                'ui.grid.cellNav',
                'ui.grid.resizeColumns',
                'ui.grid.pinning',
                'ui.grid.selection',
                'ui.grid.moveColumns',
                'ui.grid.exporter',
                'ui.grid.importer',
                'ui.grid.grouping',
                'ui.router',
                'ui.sortable'
            ]
        );

    if(debug){
        console.log('angular.module(app) defined');
    }


}());

/*****************************************************************************
 ** END OF FILE - app.js
 ****************************************************************************/