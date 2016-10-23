/*!***************************************************************************
 *****************************************************************************
 **
 ** Filename    : client.service.js
 **
 *****************************************************************************
 ****************************************************************************/

(function () {
    'use strict';
    var app = angular.module('app');


    // clientService Function
    var clientService = function($http, $q){

        var service = {
            clients: [],
            clientCats: [],
            srvcGetAllclients: srvcGetAllclients,
            srvcGetclientCats: srvcGetclientCats,
            srvcGetSelectedIndex: srvcGetSelectedIndex,
            srvcGetAclient: srvcGetAclient,
            srvcAddclient: srvcAddclient,
            srvcEditclient: srvcEditclient,
            srvcDelclient: srvcDelclient
        };

        // GET all clients
        function srvcGetAllclients(){
            var deferred = $q.defer();
            // Make call to RESTFUL API
            $http.get('json/client.json')
            .success(function(data){
                service.clients = data;
                deferred.resolve(data);
            })
            .error(function(err, status){
                deferred.reject('Failed to get clients');
            });
            return deferred.promise;
        }

        function srvcGetclientCats(){
            var clients = service.clients;
            var clientCats =  [];
            if( clients.length <1){
                clients =  srvcGetAllclients();
            }
            if( clients.length >0){
                clientCats = _.uniq(_.pluck(clients, 'category'));
            }
            service.clients = clients;
            service.clientCats = clientCats;
            return clientCats;
        }

        // get the selected index into the array
        function srvcGetSelectedIndex(id){
            if(id >= 0){
                for(var i=0; i<service.clients.length; i++){
                    if(service.clients[i].id == id){
                        return i;
                    }
                }
            }
            return -1;
        }
        
        // GET a client
        // pass in a client Id and get the client record
        function srvcGetAclient(id){
            var idx = srvcGetSelectedIndex(id);
            if(idx != -1){
                console.log('getAclient(' + id + ')(' + idx + ') = [' + service.clients[idx].name + ']');
                return service.clients[idx];
            } else {
                deferred.reject('client could not be found!');
            }
            return null;
        }

        // ADD
        function srvcAddclient(client){
            var deferred = $q.defer();
            // Make call to RESTFUL API
            $http.post('json/client.json', client)
                .success(function(data){
                    service.clients = data;
                    deferred.resolve(data);
                })
                .error(function(err, status){
                    deferred.reject('Failed to add client');
                });
            return deferred.promise;
        }

        // UPDATE
        // pass in a client record and update the fields with the values
        function srvcEditclient(client){
            var idx = srvcGetSelectedIndex(client.id);
            if(idx != -1){
                console.log('editclient(' + id + ')(' + idx + ') changed:');
                console.log('editclient( --- name     [' + service.clients[idx].name + '] changed to ['+ client.name + ']');
                console.log('editclient( --- href     [' + service.clients[idx].href + '] changed to ['+ client.href + ']');
                console.log('editclient( --- img      [' + service.clients[idx].img + '] changed to ['+ client.img + ']');
                console.log('editclient( --- category [' + service.clients[idx].category + '] changed to ['+ client.category + ']');
                service.clients[idx].name = client.name ;
                service.clients[idx].href = client.href ;
                service.clients[idx].img = client.img ;
                service.clients[idx].category = client.category ;
            } else {
                console.log('Invalid client index [' + idx + ']');
            }
            return service.clients[idx];
        }

        // DELETE
        function srvcDelclient(id){
            var idx = srvcGetSelectedIndex(id);
            if(idx != -1){
                console.log('delclient(' + id + ')(' + idx + ') deleted:');
                console.log('delclient( --- name     [' + service.clients[idx].name     + '] deleted');
                console.log('delclient( --- href     [' + service.clients[idx].href     + '] deleted');
                console.log('delclient( --- img      [' + service.clients[idx].img      + '] deleted');
                console.log('delclient( --- category [' + service.clients[idx].category + '] deleted');
                service.clients.splice(idx,1);

                return null;
            } else {
                console.log('Invalid client index [' + idx + ']');
            }
        }
        return service;
    };

    // clientService Definiton
    angular
        .module('app')
        .service('clientService', [
            '$http', 
            '$q',
            clientService]);

}());

/*****************************************************************************
 ** END OF FILE - client.service.js
 ****************************************************************************/
