/*!***************************************************************************
 *****************************************************************************
 **
 ** Filename    : samples.controller.js
 **
 *****************************************************************************
 ****************************************************************************/

(function () {
    'use strict';

    // samplesController Function
    var samplesController = function($scope, $modal, samplesService){

        if(debug){
            console.log('samplesController activated');
        }    

        var vm = $scope;

        //////////////////////////////////////////////////////////////////////
        // sampless collection
        //////////////////////////////////////////////////////////////////////
        vm.init = function(){
            vm.samples = [];
            vm.samplesCats = [];
            vm.sortOrder = 'id';
            vm.samples = vm.getAllV();
        };

        // GET All samples
        vm.getAllV = function(){
            samplesService.srvcGetAllsamples()
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
                vm.samplesCats = _.uniq(_.pluck(vm.samples, 'category'));
                //vm.samplesCats = samplesService.getsamplesCats();
            });
            if(debug && (vm.samples.length != 0) ){
                console.log('samplesController samples(' + vm.samples.length + ')');
            }
        };

        vm.init();

        vm.addsamples = function(){
            
            var modalInstance = $modal.open({
                templateUrl: '/partials/samples/addsamples.html',
                controller: 'samplesController'
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

        vm.editsamples = function(samples){
            vm.modifyData = true;
            if(confirm('Do you want to save the changes?')){
                samplesService.srvcEditsamples(samples)
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

        vm.delsamples = function(id){
            vm.modifyData = true;
            if(confirm('Are you sure you want to DELETE this samples?')){
                if(samplesService.srvcDelsamples(id) == null){
                    console.log('samples Id [' + id + '] has been deleted!');
                } else {
                    console.log('ERROR: samples Id [' + id + '] has NOT been deleted!');
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
        // console.log(' samplesCats = ', vm.samplesCats);
        // console.log('\nui-grid.Options = ', vm.gridOptions);

        return vm;
    };

    // samplesController Definiton
    angular
        .module('app')
        .controller('samplesController', [
            '$scope', 
            '$modal',
            'samplesService',
            samplesController]);

    if(debug){
        console.log('samplesController defined');
    }

}());

/*****************************************************************************
 ** END OF FILE - samples.controller.js
 ****************************************************************************/
