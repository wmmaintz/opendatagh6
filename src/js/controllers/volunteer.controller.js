/*!***************************************************************************
 *****************************************************************************
 **
 ** Filename    : volunteer.controller.js
 **
 *****************************************************************************
 ****************************************************************************/

(function () {
    'use strict';

    // volunteerController Function
    var volunteerController = function($scope, volunteerService){

        if(debug){
            console.log('volunteerController activated');
        }    

        var vm = $scope;

        //////////////////////////////////////////////////////////////////////
        // volunteers collection
        //////////////////////////////////////////////////////////////////////
        vm.init = function(){
            vm.volunteers = [];
            vm.volunteerCats = [];
            vm.sortOrder = 'id';
            vm.volunteers = vm.getAllV();
        };

        // GET All volunteers
        vm.getAllV = function(){
            volunteerService.srvcGetAllVolunteers()
            .then(function(response){
                // success
                vm.volunteers = response;
                console.log('Number of volunteers returned = [' + vm.volunteers.length + ']');
            }, function(err){
                // error
                console.log('ERROR:' + err);
            }, function(msg){
                // message
            })
            .then(function(response){
                vm.volunteerCats = _.uniq(_.pluck(vm.volunteers, 'category'));
                //vm.volunteerCats = volunteerService.getvolunteerCats();
            });
            if(debug && (vm.volunteers.length != 0) ){
                console.log('volunteerController volunteers(' + vm.volunteers.length + ')');
            }
        };

        vm.init();

        vm.addvolunteer = function(){
            
            var modalInstance = $modal.open({
                templateUrl: '/partials/volunteer/addvolunteer.html',
                controller: 'volunteerController'
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

        vm.editVolunteer = function(volunteer){
            vm.modifyData = true;
            if(confirm('Do you want to save the changes?')){
                volunteerService.srvcEditvolunteer(volunteer)
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

        vm.delVolunteer = function(id){
            vm.modifyData = true;
            if(confirm('Are you sure you want to DELETE this volunteer?')){
                if(volunteerService.srvcDelvolunteer(id) == null){
                    console.log('volunteer Id [' + id + '] has been deleted!');
                } else {
                    console.log('ERROR: volunteer Id [' + id + '] has NOT been deleted!');
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

        // console.log(' volunteers = ', vm.volunteers);
        // console.log('#volunteers = ', vm.volunteers.length);
        // console.log(' volunteerCats = ', vm.volunteerCats);
        // console.log('\nui-grid.Options = ', vm.gridOptions);

        return vm;
    };

    // volunteerController Definiton
    angular
        .module('app')
        .controller('volunteerController', [
            '$scope', 
            'volunteerService',
            volunteerController]);

    if(debug){
        console.log('volunteerController defined');
    }

}());

/*****************************************************************************
 ** END OF FILE - volunteer.controller.js
 ****************************************************************************/
