/*!***************************************************************************
 *****************************************************************************
 **
 ** Filename    : facility.controller.js
 **
 *****************************************************************************
 ****************************************************************************/

(function () {
    'use strict';

    // facilityController Function
    var facilityController = function($scope, facilityService){

        if(debug){
            console.log('facilityController activated');
        }    

        var vm = $scope;

        var app = angular.module("app", ["checklist-model"]);

        $scope.filters = [
            'hiv',
            'single men', 
            'single women', 
            'families', 
            'childcare', 
            'confidential', 
            'availability'
        ];
        $scope.user = {
            roles: ['user']
        };
        $scope.checkAll = function() {
            $scope.user.roles = angular.copy($scope.roles);
        };
        $scope.uncheckAll = function() {
            $scope.user.roles = [];
        };
        $scope.checkFirst = function() {
            $scope.user.roles.splice(0, $scope.user.roles.length); 
            $scope.user.roles.push('guest');
        };
        $scope.selected = {
            hiv : 0,
            singleMen : 0,
            singleWoman : 0,
            families : 0,
            acceptSexOffender : 0,
            childcare : 0,
            confidential : 0,
            availability : 0
        };

        $scope.allFilters = function (facility, selected) {
            return (facility.hiv == selected.hiv
                //&&  facility.singleMen == selected.singleMen
                //&&  facility.singleWoman == selected.singleWoman
                //&&  facility.families == selected.families
                //&&  facility.acceptSexOffender == selected.acceptSexOffender
                //&&  facility.childcare == selected.childcare
                //&&  facility.confidential == selected.confidential
                //&&  facility.availability == selected.availability
                );
        }

        //////////////////////////////////////////////////////////////////////
        // facilities collection
        //////////////////////////////////////////////////////////////////////
        vm.init = function(){
            vm.facilities = [];
            vm.facilityCats = [];
            vm.sortOrder = 'id';
            vm.facilities = vm.getAllV();
        };

        // GET All facilities
        vm.getAllV = function(){
            facilityService.srvcGetAllFacilities()
            .then(function(response){
                // success
                vm.facilities = response;
                console.log('Number of facilities returned = [' + vm.facilities.length + ']');
            }, function(err){
                // error
                console.log('ERROR:' + err);
            }, function(msg){
                // message
            })
            .then(function(response){
                vm.facilityCats = _.uniq(_.pluck(vm.facilities, 'category'));
                //vm.facilityCats = facilityService.getfacilityCats();
            });
            if(debug && (vm.facilities.length != 0) ){
                console.log('facilityController facilities(' + vm.facilities.length + ')');
            }
        };

        vm.init();

        vm.addFacility = function(){
            
            var modalInstance = $modal.open({
                templateUrl: '/partials/facility/addfacility.html',
                controller: 'facilityController'
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

        vm.editFacility = function(facility){
            vm.modifyData = true;
            if(confirm('Do you want to save the changes?')){
                facilityService.srvcEditFacility(facility)
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

        vm.delFacility = function(id){
            vm.modifyData = true;
            if(confirm('Are you sure you want to DELETE this facility?')){
                if(facilityService.srvcDelFacility(id) == null){
                    console.log('facility Id [' + id + '] has been deleted!');
                } else {
                    console.log('ERROR: facility Id [' + id + '] has NOT been deleted!');
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

        // console.log(' facilities = ', vm.facilities);
        // console.log('#facilities = ', vm.facilities.length);
        // console.log(' facilityCats = ', vm.facilityCats);
        // console.log('\nui-grid.Options = ', vm.gridOptions);

        return vm;
    };

    // facilityController Definiton
    angular
        .module('app')
        .controller('facilityController', [
            '$scope', 
            'facilityService',
            facilityController]);

    if(debug){
        console.log('facilityController defined');
    }

}());

/*****************************************************************************
 ** END OF FILE - facility.controller.js
 ****************************************************************************/
