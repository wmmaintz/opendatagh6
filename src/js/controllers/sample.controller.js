/*!***************************************************************************
 *****************************************************************************
 **
 ** Filename    : sample.controller.js
 **
 *****************************************************************************
 ****************************************************************************/

(function () {
    'use strict';

    // sampleController Function
    var sampleController = function($scope, sampleService){

        if(debug){
            console.log('sampleController activated');
        }    

        var vm = $scope;

        //////////////////////////////////////////////////////////////////////
        // sample collection
        //////////////////////////////////////////////////////////////////////
        vm.init = function(){
            vm.samples = [];
            vm.sampleCats = [];
            vm.sortOrder = 'id';
            vm.samples = vm.getAllV();
        };

        // GET All samples
        vm.getAllV = function(){
            sampleService.srvcGetAllSamples()
            .then(function(response){
                // success
                vm.samples = response;
                console.log('Number of samples returned = [' + vm.samples.length + ']');
            }, function(err){
                // error
                console.log('ERROR:' + err);
            }, function(msg){
                // message
            })
            .then(function(response){
                vm.sampleCats = _.uniq(_.pluck(vm.samples, 'category'));
                //vm.sampleCats = sampleService.getSampleCats();
            });
            if(debug && (vm.samples.length != 0) ){
                console.log('sampleController samples(' + vm.samples.length + ')');
            }
        };

        vm.init();

        vm.addSample = function(){
            
            var modalInstance = $modal.open({
                templateUrl: '/partials/sample/addsample.html',
                controller: 'sampleController'
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

        vm.editSample = function(sample){
            vm.modifyData = true;
            if(confirm('Do you want to save the changes?')){
                sampleService.srvcEditSample(sample)
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

        vm.delSample = function(id){
            vm.modifyData = true;
            if(confirm('Are you sure you want to DELETE this samples?')){
                if(sampleService.srvcDelSample(id) == null){
                    console.log('sample Id [' + id + '] has been deleted!');
                } else {
                    console.log('ERROR: sample Id [' + id + '] has NOT been deleted!');
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

        // console.log(' samples = ', vm.samples);
        // console.log('#samples = ', vm.samples.length);
        // console.log(' sampleCats = ', vm.sampleCats);
        // console.log('\nui-grid.Options = ', vm.gridOptions);

        return vm;
    };

    // sampleController Definiton
    angular
        .module('app')
        .controller('sampleController', [
            '$scope', 
            'sampleService',
            sampleController]);

    if(debug){
        console.log('sampleController defined');
    }

}());

/*****************************************************************************
 ** END OF FILE - sample.controller.js
 ****************************************************************************/
