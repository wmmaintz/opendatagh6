/*!***************************************************************************
 *****************************************************************************
 **
 ** Filename    : filters.js
 **
 *****************************************************************************
 ****************************************************************************/
/*jshint -W109 */ // ignore double-quotes in between single-quotes

(function (debug) {
    'use strict';

    angular
        .module('app')
        .filter('noNulls', function(Photos) {
            
                var filteredPhotos = [];
                
                if(Photos){
                    for (var i=0; i<Photos.length; i++) {
                        if( Photos[i].name !== ''){
                            filteredPhotos.push(Photos[i]);
                        }
                    }
                }
                console.log( 'filteredPhotos from noNulls' );
                console.log( filteredPhotos );
                return filteredPhotos;
            }
        );
        
    if(debug){
        console.log('filter("noNulls") defined');
    }

    angular
        .module('app')
        .filter('hilights', function(Photos) {
            
                var filteredPhotos = [];

                if(Photos){
                    for (var i=0; i<Photos.length; i++) {
                        if( Photos[i].hilight == 1){
                            filteredPhotos.push(Photos[i]);
                        }
                    }
                }
                console.log( 'filteredPhotos from hilights' );
                console.log( filteredPhotos );
                return filteredPhotos;
            }
        );

    if(debug){
        console.log('filter("hilights") defined');
    }

}());

/*****************************************************************************
 ** END OF FILE - filter.js
 ****************************************************************************/
