/*!***************************************************************************
 *****************************************************************************
 **
 ** Filename    : samples.service.js
 **
 *****************************************************************************
 ****************************************************************************/

(function () {
    'use strict';
    var app = angular.module('app');


    // samplesService Function
    var samplesService = function($http, $q){

        var service = {
            samples: [],
            sampleCats: [],
            srvcGetAllsamples: srvcGetAllsamples,
            srvcGetsampleCats: srvcGetsampleCats,
            srvcGetSelectedIndex: srvcGetSelectedIndex,
            srvcGetAsample: srvcGetAsample,
            srvcAddsample: srvcAddsample,
            srvcEditsample: srvcEditsample,
            srvcDelsample: srvcDelsample
        };

        // GET all samples
        function srvcGetAllsamples(){
            var deferred = $q.defer();
            // Make call to RESTFUL API
            $http.get('json/samples.json')
            .success(function(data){
                service.samples = data;
                deferred.resolve(data);
            })
            .error(function(err, status){
                deferred.reject('Failed to get samples');
            });
            return deferred.promise;
        }

        function srvcGetsampleCats(){
            var samples = service.samples;
            var sampleCats =  [];
            if( samples.length <1){
                samples =  srvcGetAllsamples();
            }
            if( samples.length >0){
                sampleCats = _.uniq(_.pluck(samples, 'category'));
            }
            service.samples = samples;
            service.sampleCats = sampleCats;
            return sampleCats;
        }

        // get the selected index into the array
        function srvcGetSelectedIndex(id){
            if(id >= 0){
                for(var i=0; i<service.samples.length; i++){
                    if(service.samples[i].id == id){
                        return i;
                    }
                }
            }
            return -1;
        }
        
        // GET a sample
        // pass in a sample Id and get the sample record
        function srvcGetAsample(id){
            var idx = srvcGetSelectedIndex(id);
            if(idx != -1){
                console.log('getAsample(' + id + ')(' + idx + ') = [' + service.samples[idx].name + ']');
                return service.samples[idx];
            } else {
                deferred.reject('sample could not be found!');
            }
            return null;
        }

        // ADD
        function srvcAddsample(sample){
            var deferred = $q.defer();
            // Make call to RESTFUL API
            $http.post('json/samples.json', sample)
                .success(function(data){
                    service.samples = data;
                    deferred.resolve(data);
                })
                .error(function(err, status){
                    deferred.reject('Failed to add sample');
                });
            return deferred.promise;
        }

        // UPDATE
        // pass in a sample record and update the fields with the values
        function srvcEditsample(sample){
            var idx = srvcGetSelectedIndex(sample.id);
            if(idx != -1){
                console.log('editsample(' + id + ')(' + idx + ') changed:');
                console.log('editsample( --- name     [' + service.samples[idx].name + '] changed to ['+ sample.name + ']');
                console.log('editsample( --- href     [' + service.samples[idx].href + '] changed to ['+ sample.href + ']');
                console.log('editsample( --- img      [' + service.samples[idx].img + '] changed to ['+ sample.img + ']');
                console.log('editsample( --- category [' + service.samples[idx].category + '] changed to ['+ sample.category + ']');
                service.samples[idx].name = sample.name ;
                service.samples[idx].href = sample.href ;
                service.samples[idx].img = sample.img ;
                service.samples[idx].category = sample.category ;
            } else {
                console.log('Invalid sample index [' + idx + ']');
            }
            return service.samples[idx];
        }

        // DELETE
        function srvcDelsample(id){
            var idx = srvcGetSelectedIndex(id);
            if(idx != -1){
                console.log('delsample(' + id + ')(' + idx + ') deleted:');
                console.log('delsample( --- name     [' + service.samples[idx].name     + '] deleted');
                console.log('delsample( --- href     [' + service.samples[idx].href     + '] deleted');
                console.log('delsample( --- img      [' + service.samples[idx].img      + '] deleted');
                console.log('delsample( --- category [' + service.samples[idx].category + '] deleted');
                service.samples.splice(idx,1);

                return null;
            } else {
                console.log('Invalid sample index [' + idx + ']');
            }
        }
        return service;
    };

    // samplesService Definiton
    angular
        .module('app')
        .service('samplesService', [
            '$http', 
            '$q',
            samplesService]);

}());

/*****************************************************************************
 ** END OF FILE - samples.service.js
 ****************************************************************************/
