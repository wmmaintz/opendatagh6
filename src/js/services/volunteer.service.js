/*!***************************************************************************
 *****************************************************************************
 **
 ** Filename    : volunteer.service.js
 **
 *****************************************************************************
 ****************************************************************************/

(function () {
    'use strict';
    var app = angular.module('app');


    // volunteerService Function
    var volunteerService = function($http, $q){

        var service = {
            volunteers: [],
            volunteerCats: [],
            srvcGetAllVolunteers: srvcGetAllVolunteers,
            srvcGetVolunteerCats: srvcGetVolunteerCats,
            srvcGetSelectedIndex: srvcGetSelectedIndex,
            srvcGetAVolunteer: srvcGetAVolunteer,
            srvcAddVolunteer: srvcAddVolunteer,
            srvcEditVolunteer: srvcEditVolunteer,
            srvcDelVolunteer: srvcDelVolunteer
        };

        // GET all volunteers
        function srvcGetAllVolunteers(){
            var deferred = $q.defer();
            // Make call to RESTFUL API
            $http.get('json/volunteer.json')
            .success(function(data){
                service.volunteers = data;
                deferred.resolve(data);
            })
            .error(function(err, status){
                deferred.reject('Failed to get volunteers');
            });
            return deferred.promise;
        }

        function srvcGetVolunteerCats(){
            var volunteers = service.volunteers;
            var volunteerCats =  [];
            if( volunteers.length <1){
                volunteers =  srvcGetAllvolunteers();
            }
            if( volunteers.length >0){
                volunteerCats = _.uniq(_.pluck(volunteers, 'category'));
            }
            service.volunteers = volunteers;
            service.volunteerCats = volunteerCats;
            return volunteerCats;
        }

        // get the selected index into the array
        function srvcGetSelectedIndex(id){
            if(id >= 0){
                for(var i=0; i<service.volunteers.length; i++){
                    if(service.volunteers[i].id == id){
                        return i;
                    }
                }
            }
            return -1;
        }
        
        // GET a volunteer
        // pass in a volunteer Id and get the volunteer record
        function srvcGetAVolunteer(id){
            var idx = srvcGetSelectedIndex(id);
            if(idx != -1){
                console.log('getAvolunteer(' + id + ')(' + idx + ') = [' + service.volunteers[idx].name + ']');
                return service.volunteers[idx];
            } else {
                deferred.reject('volunteer could not be found!');
            }
            return null;
        }

        // ADD
        function srvcAddVolunteer(volunteer){
            var deferred = $q.defer();
            // Make call to RESTFUL API
            $http.post('json/volunteer.json', volunteer)
                .success(function(data){
                    service.volunteers = data;
                    deferred.resolve(data);
                })
                .error(function(err, status){
                    deferred.reject('Failed to add volunteer');
                });
            return deferred.promise;
        }

        // UPDATE
        // pass in a volunteer record and update the fields with the values
        function srvcEditVolunteer(volunteer){
            var idx = srvcGetSelectedIndex(volunteer.id);
            if(idx != -1){
                console.log('editvolunteer(' + id + ')(' + idx + ') changed:');
                console.log('editvolunteer( --- name     [' + service.volunteers[idx].name + '] changed to ['+ volunteer.name + ']');
                console.log('editvolunteer( --- href     [' + service.volunteers[idx].href + '] changed to ['+ volunteer.href + ']');
                console.log('editvolunteer( --- img      [' + service.volunteers[idx].img + '] changed to ['+ volunteer.img + ']');
                console.log('editvolunteer( --- category [' + service.volunteers[idx].category + '] changed to ['+ volunteer.category + ']');
                service.volunteers[idx].name = volunteer.name ;
                service.volunteers[idx].href = volunteer.href ;
                service.volunteers[idx].img = volunteer.img ;
                service.volunteers[idx].category = volunteer.category ;
            } else {
                console.log('Invalid volunteer index [' + idx + ']');
            }
            return service.volunteers[idx];
        }

        // DELETE
        function srvcDelVolunteer(id){
            var idx = srvcGetSelectedIndex(id);
            if(idx != -1){
                console.log('delvolunteer(' + id + ')(' + idx + ') deleted:');
                console.log('delvolunteer( --- name     [' + service.volunteers[idx].name     + '] deleted');
                console.log('delvolunteer( --- href     [' + service.volunteers[idx].href     + '] deleted');
                console.log('delvolunteer( --- img      [' + service.volunteers[idx].img      + '] deleted');
                console.log('delvolunteer( --- category [' + service.volunteers[idx].category + '] deleted');
                service.volunteers.splice(idx,1);

                return null;
            } else {
                console.log('Invalid volunteer index [' + idx + ']');
            }
        }
        return service;
    };

    // volunteerService Definiton
    angular
        .module('app')
        .service('volunteerService', [
            '$http', 
            '$q',
            volunteerService]);

}());

/*****************************************************************************
 ** END OF FILE - volunteer.service.js
 ****************************************************************************/
