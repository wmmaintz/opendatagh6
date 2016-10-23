/*!***************************************************************************
 *****************************************************************************
 **
 ** Filename    : client.controller.js
 **
 *****************************************************************************
 ****************************************************************************/

(function () {
    'use strict';

    // clientController Function
    var clientController = function($scope, clientService){

        if(debug){
            console.log('clientController activated');
        }    

        var vm = $scope;

        //////////////////////////////////////////////////////////////////////
        // clients collection
        //////////////////////////////////////////////////////////////////////
        vm.init = function(){
            vm.clients = [];
            vm.clientCats = [];
            vm.clientSelected = false;
            vm.clients = vm.getAllV();
        };

        // Select a specific client from the list
        vm.selectClient = function(id){
            alert("ID = " + id);
            for(var i=0;i<clients.length;i++){
                if( clients[i].clientId = id){
                    return clients[i];
                }
            }
            return null;
        }

        // GET All clients
        vm.getAllV = function(){
            clientService.srvcGetAllclients()
            .then(function(response){
                // success
                vm.clients = response;
                console.log('Number of clients returned = [' + vm.clients.length + ']');
            }, function(err){
                // error
                console.log('ERROR:' + err);
            }, function(msg){
                // message
            })
            .then(function(response){
                vm.clientCats = _.uniq(_.pluck(vm.clients, 'category'));
                //vm.clientCats = clientService.getclientCats();
            });
            if(debug && (vm.clients.length != 0) ){
                console.log('clientController clients(' + vm.clients.length + ')');
            }
        };

        vm.init();

        vm.addclient = function(){
            
            var modalInstance = $modal.open({
                templateUrl: '/partials/client/addclient.html',
                controller: 'clientController'
            });

            modalInstance.result.then(function(){
                // success
                vm.getAllV();
            }, function(err){
                // error
                vm.getAllV();
            }, function(msg){
                // message
            });
            vm.modifyData = false;
        };

        vm.editclient = function(client){
            vm.modifyData = true;
            if(confirm('Do you want to save the changes?')){
                clientService.srvcEditclient(client)
                .then(function(response){
                    // success
                    vm.getAllV();
                }, function(err){
                    // error
                    console.log('ERROR:' + err);
                }, function(msg){
                    // message
                });
            }
            vm.modifyData = false;
        };

        vm.delclient = function(id){
            vm.modifyData = true;
            if(confirm('Are you sure you want to DELETE this client?')){
                if(clientService.srvcDelclient(id) == null){
                    console.log('client Id [' + id + '] has been deleted!');
                } else {
                    console.log('ERROR: client Id [' + id + '] has NOT been deleted!');
                }
            }
            vm.modifyData = false;
        };

        vm.modifyData = false;

        //////////////////////////////////////////////////////////////////////
        // ui-grid options
        //////////////////////////////////////////////////////////////////////

        vm.gridOptions = {
            enableColumnResizing: true,
            enableSorting: true,
            rowHeight:100,
            columnDefs: [
                {field: 'img', cellTemplate:'<img width=\'120px\' ng-src=\'{{grid.getCellValue(row, col)}}\' lazy-src>' },
                {field: 'name', displayName: 'Name'},
                {field: 'category', displayName: 'Category'},
                {name: 'edit', displayName: 'Edit', 
                    cellTemplate: '<button id="editBtn" type="button" class="btn-small" ng-click="edit(row.entity)" >Edit</button> '}
           ]    
        };

        vm.rowColor = ['cyan', 'cream'];

        // console.log(' clients = ', vm.clients);
        // console.log('#clients = ', vm.clients.length);
        // console.log(' clientCats = ', vm.clientCats);
        // console.log('\nui-grid.Options = ', vm.gridOptions);

        return vm;
    };

    // clientController Definiton
    angular
        .module('app')
        .controller('clientController', [
            '$scope', 
            'clientService',
            clientController]);

    if(debug){
        console.log('clientController defined');
    }

}());

/*****************************************************************************
 ** END OF FILE - client.controller.js
 ****************************************************************************/
