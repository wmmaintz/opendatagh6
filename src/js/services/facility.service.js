/*!***************************************************************************
 *****************************************************************************
 **
 ** Filename    : facility.service.js
 **
 *****************************************************************************
 ****************************************************************************/

(function () {
    'use strict';
    var app = angular.module('app');


    // facilityService Function
    var facilityService = function($http, $q){

        var service = {
            facilities: [],
            facilityCats: [],
            srvcGetAllFacilities: srvcGetAllFacilities,
            srvcGetFacilityCats: srvcGetFacilityCats,
            srvcGetSelectedIndex: srvcGetSelectedIndex,
            srvcGetAFacility: srvcGetAFacility,
            srvcAddFacility: srvcAddFacility,
            srvcEditFacility: srvcEditFacility,
            srvcDelFacility: srvcDelFacility
        };

        // GET all facilities
        function srvcGetAllFacilities(){
            var deferred = $q.defer();
            // Make call to RESTFUL API
            $http.get('json/facility.json')
            .success(function(data){
                service.facilities = data;
                deferred.resolve(data);
            })
            .error(function(err, status){
                deferred.reject('Failed to get facilities');
            });
            return deferred.promise;
        }

        function srvcGetFacilityCats(){
            var facilities = service.facilities;
            var facilityCats =  [];
            if( facilities.length <1){
                facilities =  srvcGetAllfacilities();
            }
            if( facilities.length >0){
                facilityCats = _.uniq(_.pluck(facilities, 'category'));
            }
            service.facilities = facilities;
            service.facilityCats = facilityCats;
            return facilityCats;
        }

        // get the selected index into the array
        function srvcGetSelectedIndex(id){
            if(id >= 0){
                for(var i=0; i<service.facilities.length; i++){
                    if(service.facilities[i].id == id){
                        return i;
                    }
                }
            }
            return -1;
        }
        
        // GET a facility
        // pass in a facility Id and get the facility record
        function srvcGetAFacility(id){
            var idx = srvcGetSelectedIndex(id);
            if(idx != -1){
                console.log('getAFacility(' + id + ')(' + idx + ') = [' + service.facilities[idx].name + ']');
                return service.facilities[idx];
            } else {
                deferred.reject('Facility could not be found!');
            }
            return null;
        }

        // ADD
        function srvcAddFacility(facility){
            var deferred = $q.defer();
            // Make call to RESTFUL API
            $http.post('json/facility.json', facility)
                .success(function(data){
                    service.facilities = data;
                    deferred.resolve(data);
                })
                .error(function(err, status){
                    deferred.reject('Failed to add facility');
                });
            return deferred.promise;
        }

        // UPDATE
        // pass in a facility record and update the fields with the values
        function srvcEditFacility(facility){
            var idx = srvcGetSelectedIndex(facility.id);
            if(idx != -1){
                console.log('editFacility(' + id + ')(' + idx + ') changed:');
                console.log('editFacility( --- name     [' + service.facilities[idx].name + '] changed to ['+ facility.name + ']');
                console.log('editFacility( --- href     [' + service.facilities[idx].href + '] changed to ['+ facility.href + ']');
                console.log('editFacility( --- img      [' + service.facilities[idx].img + '] changed to ['+ facility.img + ']');
                console.log('editFacility( --- category [' + service.facilities[idx].category + '] changed to ['+ facility.category + ']');
                service.facilities[idx].name = facility.name ;
                service.facilities[idx].href = facility.href ;
                service.facilities[idx].img = facility.img ;
                service.facilities[idx].category = facility.category ;
            } else {
                console.log('Invalid facility index [' + idx + ']');
            }
            return service.facilities[idx];
        }

        // DELETE
        function srvcDelFacility(id){
            var idx = srvcGetSelectedIndex(id);
            if(idx != -1){
                console.log('delFacility(' + id + ')(' + idx + ') deleted:');
                console.log('delFacility( --- name     [' + service.facility[idx].name     + '] deleted');
                console.log('delFacility( --- href     [' + service.facility[idx].href     + '] deleted');
                console.log('delFacility( --- img      [' + service.facility[idx].img      + '] deleted');
                console.log('delFacility( --- category [' + service.facility[idx].category + '] deleted');
                service.facility.splice(idx,1);

                return null;
            } else {
                console.log('Invalid facility index [' + idx + ']');
            }
        }
        return service;
    };

    // facilityService Definiton
    angular
        .module('app')
        .service('facilityService', [
            '$http', 
            '$q',
            facilityService]);

}());

/*****************************************************************************
 ** END OF FILE - facility.service.js
 ****************************************************************************/
