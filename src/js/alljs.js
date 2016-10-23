/*****************************************************************************
 **
 ** @ngdoc overview
 ** @name app.js
 **
 ** @description
 ** main AngularJS application definition file - loads all plugins that will 
 ** be a part of the module.
 **
 ****************************************************************************/
    
// Global debug flag (passed to other modules)
var debug = true;

(function () {
    'use strict';

    // Define main module.
    var ngApp = angular
        .module('app', 
            [
                'ngAnimate',
                'ngResource',
                'ngTouch',
                'ui',
                'ui.bootstrap',
                'ui.bootstrap.carousel',
                'ui.bootstrap.progressbar',
                'ui.grid',
                'ui.grid.edit',
                'ui.grid.cellNav',
                'ui.grid.resizeColumns',
                'ui.grid.pinning',
                'ui.grid.selection',
                'ui.grid.moveColumns',
                'ui.grid.exporter',
                'ui.grid.importer',
                'ui.grid.grouping',
                'ui.router',
                'ui.sortable'
            ]
        );

    if(debug){
        console.log('angular.module(app) defined');
    }


}());

/*****************************************************************************
 ** END OF FILE - app.js
 ****************************************************************************/
/*!***************************************************************************
 *****************************************************************************
 **
 ** Filename    : app.config.js
 **
 *****************************************************************************
 ****************************************************************************/
(function () {
    'use strict';

    // Navigation is supplied via the following ui-router section
    // 
    angular
        .module('app')
        .config( [   '$urlRouterProvider', '$stateProvider',
            function ($urlRouterProvider,   $stateProvider) {
                
                $stateProvider

                // url - matches the ui-sref on the index.html page
                // templateUrl - matches the location of the partial html file
                // controller - matches the name of the controller associated with this page
                // service - identifies the service used to get the data needed for this page.
                //
                // To be displayed on main screen:
                // $state          = {{ $state.current.name }}
                // $stateParams    = {{ $stateParams }}
                // $state full url = {{ $state.$current.url.source }}
                // $stateProvider  = {{ $stateProvider }}
                
                /* Home */
                .state('home', {
                    controller: 'homeController',
                    templateUrl: 'partials/home/home.html',
                    url: '/home'
                })

                /* facilities */    
                .state('facility', {
                    controller: 'facilityController',
                    templateUrl: 'partials/facility/facility.html',
                    url: '/facility'
                })

                /* client */
                .state('client', {
                    controller: 'clientController',
                    templateUrl: 'partials/client/client.html',
                    url: '/client'
                })

                /* volunteers */
                .state('volunteer', {
                    controller: 'volunteerController',
                    templateUrl: 'partials/volunteer/volunteer.html',
                    url: '/volunteer'
                })

                /* sample */
                .state('sample', {
                    controller: 'sampleController',
                    templateUrl: 'partials/sample/sample.html',
                    url: '/sample'
                })

                /* sample */
                .state('sample2', {
                    controller: 'sampleController',
                    templateUrl: 'partials/sample/sample2.html',
                    url: '/sample2'
                })

                /* Login */
                .state('login', {
                    controller: 'userController',
                    templateUrl: 'partials/account/login.html',
                    url: '/login'
                })

                /* Logout */
                .state('logout', {
                    templateUrl: 'partials/account/logout.html',
                    url: '/logout'
                });

                $urlRouterProvider
                    /*
                    ** The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
                    ** Here we are just setting up some convenience urls.
                    */
                    .when('/facility/:facilityName', '/partials/facility/:id')
                    .when('/volunteer/:volunteerName', '/partials/volunteer/:id')
                    .when('/client/:clientName', '/partials/client/:id')
                    /*
                    ** If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
                    */
                    .otherwise('/home');

            }
        ]);

    if(debug){
        console.log('       .config(["$urlRouterProvider", "$stateProvider"]) defined');
    }


}());

/*****************************************************************************
 ** END OF FILE - app.config.js
 ****************************************************************************/
/*!***************************************************************************
 *****************************************************************************
 **
 ** Filename    : app.run.js
 **
 *****************************************************************************
 ****************************************************************************/
(function () {
    'use strict';

angular
        .module('app')
        .run(
        [            '$rootScope', '$state', '$stateParams',
            function ($rootScope,   $state,   $stateParams) {
                /* It's very handy to add references to $state and $stateParams to the $rootScope
                ** so that you can access them from any scope within your applications.
                ** For example, <li ng-class='{ active: $state.includes('contacts.list') }'> will
                ** set the <li> to active whenever 'contacts.list' or one of its decendents is active.
                */
                
                $rootScope.state = $state;
                $rootScope.stateParams = $stateParams;

                $rootScope.pageLoaded = true;

                if(debug){
                    $rootScope.debug = debug;
                    $rootScope.endPoint = 'http://localhost:3000';
                } else {
                    $rootScope.endPoint = 'http://resex.org';
                }    
            }
        ]);

    if(debug){
        console.log('       .run(["$rootScope","$state","$stateParams",function ($rootScope,$state,$stateParams) executed');
    }

}());

/*****************************************************************************
 ** END OF FILE - app.run.js
 ****************************************************************************/
/*!***************************************************************************
 *****************************************************************************
 **
 ** Filename    : misc.js
 **
 *****************************************************************************
 ****************************************************************************/
/*jshint -W061 */ // ignore eval can be harmful


    // $('ul.dropdown-menu').find('li').click(function () {
    //     // remove the 'open' class on the parent element 
    //     $(this).parents('.dropdown-menu').parent().removeClass('open');
    //     $(this).parents('.dropdown-menu').parent().removeClass('active');
    // });

//(function () {
    'use strict';

    //////////////////////////////////////////////////////////////////////////////
    // Miscellaneous Calendar functions
    //////////////////////////////////////////////////////////////////////////////

    function getCalendarHTML(mo, yr, showToday){
        // mo = zero-based month number
        // yr = 4 digit year YYYY
        // Create an array containing the month names
        var M = new Array('January','February','March','April','May','June','July',
                        'August','September','October','November','December');
        // Create an array with the days of the week
        var D = new Array('Sun','Mon','Tue','Wed','Thu','Fri','Sat');
        // The first of the month
        var dayOne = new Date(M[mo]+' 1,'+yr);
        // Determine the day of the week upon which the 1st of the month falls
        var dy = dayOne.getDay();
        yr = eval(yr);
        
        // Days in each month
        var d = '312831303130313130313031';
        // Is this leap year?
        if (yr / 4 === Math.floor(yr / 4)) {
            d = d.substring(0, 2) + '29' + d.substring(4, d.length);
        }
        // Calculate the position in the d string for this month
        var pos = (mo * 2);
        // Grab 2 character positions representing the number of days in this month (last day)
        var ld = eval(d.substring(pos, pos + 2));
        var tday = new Date().getDate();
        var dow = new Date().getDay();
        
        // Start outputting this month's calendar
        //var htmlText =  '<div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">';
        var htmlText = '<table class="calTable"><tr>';
        // Display the month and year
        htmlText += '<th class="monHdr"';
        if(showToday){htmlText += ' hiLite';}
        htmlText += '" colspan=7 center>' + M[mo] + ' ' + yr + '</th></tr>';
        // Display the days of the week
        htmlText += '<tr>';
        for (var i = 0;i < 7;i ++) {
            if((i == dow) && (showToday)) {
                    htmlText += '<td class="wkdayHdr hiLite">';
                } else {
                    htmlText += '<td class="wkdayHdr">';
                }
                htmlText += D[i] + '</td>';                    // Display the days of the week
        }
        htmlText += '</tr>';
        var ctr = 0;
        // Display the day of the month or a blank if the 1st falls in mid-week
        htmlText += '<tr class="calDayRow">';
        // Display the day of the month or a blank space
        // for the first week of the month
        for (i = 0;i < 7; i++){
            if (i < dy) {
                htmlText += '<td> </td>';
            }
            else {
                ctr++;
                if((ctr == tday) && (showToday)) {
                    htmlText += '<td class="hiLite">';
                } else {
                    htmlText += '<td>';
                }
                htmlText += ctr + '</td>';
            }
        }
        htmlText += '</tr>';
        // Display the day of the month for the rest of the month
        // Display a blank after the last day of the month
        htmlText += '<tr class="calDayRow">';
        while (ctr <= ld) {
            for (i = 0;i < 7; i++){
                ctr++;
                if (ctr > ld){
                    htmlText += '<td> </td>';
                }
                else {
                    if((ctr == tday) && (showToday)) {
                        htmlText += '<td class="hiLite">';
                    } else {
                        htmlText += '<td>';
                    }
                    htmlText += ctr + '</td>';
                }
            }
            htmlText += '</tr><tr class="calDayRow">';
        }
        htmlText += '</tr></table><br class="clear" /></div>';
        return htmlText;
    }
    

    function showCalenders() {

        var today = new Date();                                     // today's date
        var thisMonth = today.getMonth();                           // the current month - zero-based
        var thisYear = today.getYear() + 1900;                      // the current year
        var lastMonth = (thisMonth===0?11:thisMonth-1);             // calculate last month
        var lastYear = (thisMonth===0?thisYear-1:thisYear);         // calculate last month's year
        var nextYear = (thisMonth===11?thisYear+1:thisYear);        // next month's year
        var nextMonth = (thisMonth===11?0:thisMonth+1);             // next month

        var lastMonHtml = document.getElementById('calLastMon');
        var thisMonHtml = document.getElementById('calThisMon');
        var nextMonHtml = document.getElementById('calNextMon');
           
        if( lastMonHtml )
        {
            lastMonHtml.innerHTML = getCalendarHTML(lastMonth, lastYear, false);    // Send last month to screen
        }
        
        if( thisMonHtml )
        {
            thisMonHtml.innerHTML = getCalendarHTML(thisMonth, thisYear, true);     // Send this month to screen
        }
    
        if( nextMonHtml )
        {
            nextMonHtml.innerHTML = getCalendarHTML(nextMonth, nextYear, false);    // Send next month to screen
        }

    }

    //////////////////////////////////////////////////////////////////////////////
    // Gather Screen Size Information
    //////////////////////////////////////////////////////////////////////////////

    function gebID(id){
        return document.getElementById(id); 
    }
    
    function gebTN(tagName){
        return document.getElementsByTagName(tagName);
    }
    
    function setStyleToTags(tagName, styleString){
        var tags = gebTN(tagName);
        for( var i = 0; i<tags.length; i++ )
            tags[i].setAttribute('style', styleString);
    }
    
    function testSizes(parentObj){
        if( parentObj === null){ parentObj = 'body'; }
        
        gebID( 'screen.Width' ).innerHTML = screen.width.toString();
        gebID( 'screen.Height' ).innerHTML = screen.height.toString();

        gebID( 'window.Width' ).innerHTML = window.innerWidth.toString();
        gebID( 'window.Height' ).innerHTML = window.innerHeight.toString();

        gebID( 'documentElement.Width' ).innerHTML = document.documentElement.clientWidth.toString();
        gebID( 'documentElement.Height' ).innerHTML = document.documentElement.clientHeight.toString();

        gebID( 'body.Width' ).innerHTML = gebTN(parentObj)[0].clientWidth.toString();
        gebID( 'body.Height' ).innerHTML = gebTN(parentObj)[0].clientHeight.toString();
    }

    function displaySizes(parentObj) {
        if( parentObj === null){ parentObj = 'body'; }
        var table = document.createElement('table');
        table.innerHTML = '<tr><th>SOURCE</th><th>WIDTH</th><th>x</th><th>HEIGHT</th></tr>' +
        '<tr><td>screen</td><td id=\'screen.Width\' /><td>x</td><td id=\'screen.Height\' /></tr>' +
        '<tr><td>window</td><td id=\'window.Width\' /><td>x</td><td id=\'window.Height\' /></tr>' +
        '<tr><td>document<br>.documentElement</td><td id=\'documentElement.Width\' /><td>x</td>'+
        '<td id=\'documentElement.Height\' /></tr>' +
        '<tr><td>document.body</td><td id=\'body.Width\' /><td>x</td><td id=\'body.Height\' /></tr>';

        gebTN(parentObj)[0].appendChild( table );

        setStyleToTags('table',
                    'border: 2px solid black !important; position: fixed !important;' +
                    'left: 100px !important; top: 90px !important; padding:5px !important;' +
                    'width: 200px !important; font-size:10px; !important' +
                    'white-space: pre !important; font-family: monospace !important;' +
                    'z-index: 9999 !important;background: white !important;'
        );
        setStyleToTags('td', 'color: black !important; border: none !important; padding: 5px !important; text-align:center !important;');
        setStyleToTags('th', 'color: black !important; border: none !important; padding: 5px !important; text-align:center !important;');

        table.style.setProperty( 'margin-left', '-'+( table.clientWidth / 2 )+'px' );

        setInterval( testSizes, 200 );
    }

    function sortByKey(array, key) {
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    function multObjArray2Array(multObjArray){
        //console.debug('multObjArray');
        //console.debug(multObjArray);
        var allArray = [];
        for(var i=0; i<multObjArray.length; i++)
        {
            for(var j=0; j<multObjArray[i].length;j++)
            {
                allArray.push( multObjArray[i][j] );
                //console.debug('\tAdding ' + multObjArray[i][j]);
            }
        }
        return allArray;
    }

    function JSONDateToDateObj (jd) { // jd = JSON Date format ie. '2013-03-08T14:34:00:000Z'
        if( (jd.length != 24) ||  (jd.substr(4,1) != '-') ||  (jd.substr(7,1) != '-') ||  (jd.substr(10,1) != 'T') ||  (jd.substr(13,1) != ':') ||  (jd.substr(16,1) != ':') ||  (jd.substr(19,1) != ':') ||  (jd.substr(23,1) != 'Z') ) {
            return null;
        }
        var d = new Date();
        d.setFullYear(jd.substr(0,4), jd.substr(5,2)-1, jd.substr(8,2));
        d.setHours(jd.substr(11,2));
        d.setMinutes(jd.substr(14,2));
        d.setSeconds(jd.substr(17,2));
        d.setMilliseconds(jd.substr(20,3));
        return d;
    }

    function editImageData(imgID) {
        alert('I\'m sorry, you don\'t have the authority to edit image ID#' + imgID + '.');
    }

    function deleteImage(imgID){
        alert('I\'m sorry, you don\'t have the authority to delete image ID#' + imgID + '.');
    }

    function enlargeToggle(imgID){
        alert('Enlarge image ID#' + imgID + '.');
    }

    function resizePage() {
        $( document ).ready(function() {
            console.log( 'resizePage: resize screen on load!' );
            var newHeight = window.height - 100;
            $( '#photoCarousel' ).css( 'height', newHeight );
        });
    }

    function timedLoop(i, secs) {          
        setTimeout(function () {   
            console.log('timedLoop(' + i + ', ' + secs  + ')');         //  your code here                
            if (--i) timedLoop(i, secs);     //  decrement i and call myLoop again if i > 0
        }, secs * 1000);
    }                               //  pass the number of iterations as an argument

    if(debug){
        console.log('misc.js functions defined');
    }

//}());


/*****************************************************************************
 ** END OF FILE - misc.js
 ****************************************************************************/

/*!***************************************************************************
 *****************************************************************************
 **
 ** Filename    : about.controller.js
 **
 *****************************************************************************
 ****************************************************************************/

(function () {
    'use strict';

    var aboutController = function ($scope) {
        
        if(debug){
            console.log('aboutController activated');
        }    

        $scope.items = [
            'about',
            'website'
        ];

    };

    angular
        .module('app')
        .controller('aboutController', [
            '$scope', 
            aboutController
        ]);

    if(debug){
        console.log('aboutController defined');
    }

}());

/*****************************************************************************
 ** END OF FILE - about.controller.js
 ****************************************************************************/

/*!***************************************************************************
 *****************************************************************************
 **
 ** Filename    : home.controller.js
 **
 *****************************************************************************
 ****************************************************************************/

(function () {
    'use strict';

    angular
        .module('app')
        .controller('homeController', [
                '$rootScope', 
        function($rootScope){

            var vm = $rootScope;
            
            if(debug){
                console.log('homeController activated');
            }    
            
            // Temporary values 
            // TODO: replace these with real login values;
            vm.loggedIn = true;
            vm.userName = 'bill@maintz.com';
            
            showCalenders();
            return vm;
        }
    ]);

    if(debug){
        console.log('homeController defined');
    }

}());

/*****************************************************************************
 ** END OF FILE - home.controller.js
 ****************************************************************************/

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
            vm.sortOrder = 'id';
            vm.clients = vm.getAllV();
        };

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

/*!***************************************************************************
 *****************************************************************************
 **
 ** Filename    : user.controller.js
 **
 *****************************************************************************
 ****************************************************************************/

(function () {
    'use strict';

    var userController = function ($scope) {
        
        if(debug){
            console.log('userController activated');
        }    

        $scope.items = [
            'user',
            'website'
        ];

    };

    angular
        .module('app')
        .controller('userController', [
            '$scope', 
            userController
        ]);

    if(debug){
        console.log('userController defined');
    }

}());

/*****************************************************************************
 ** END OF FILE - user.controller.js
 ****************************************************************************/

/*!***************************************************************************
 *****************************************************************************
 **
 ** Filename    : directives.js
 **
 *****************************************************************************
 ****************************************************************************/

// Define your directives here. 
// Directives can be added to same module as the main 'app' 
// or a seperate module can be created.

/**
 * @ngdoc directive
 * @name ui.bootstrap.carousel.directive:slide
 * @restrict EA
 *
 * @description
 * Creates a slide inside a {@link ui.bootstrap.carousel.directive:carousel carousel}.  Must be placed as a child of a carousel element.
 *
 * @param {boolean=} active Model binding, whether or not this slide is currently active.
 * @param {number=} index The index of the slide. The slides will be sorted by this parameter.
 *
 * @example
<example module="ui.bootstrap">
    <file name="index.html">
        <div ng-controller="CarouselDemoCtrl">
            <carousel>
                <slide ng-repeat="slide in slides" active="slide.active" index="$index">
                    <img ng-src="{{slide.image}}" style="margin:auto;">
                    <div class="carousel-caption">
                        <h4>Slide {{$index}}</h4>
                        <p>{{slide.text}}</p>
                    </div>
                </slide>
            </carousel>
            Interval, in milliseconds: <input type="number" ng-model="myInterval">
            <br />Enter a negative number to stop the interval.
        </div>
    </file>
    <file name="script.js">
        function CarouselDemoCtrl() {
            var vm = this;
            vm.myInterval = 5000;
        }
    </file>
    <file name="demo.css">
        .carousel-indicators {
            top: auto;
            bottom: 15px;
        }
    </file>
</example>
*/

(function () {
    'use strict';

    angular
        .module('app')
        .directive('photoFlip',
        function () {
            return {
                restrict: 'E',
                replace: true,
                //templateURL: 'partials/photos/photo.test.html'
                template: '<div>\n<input type="text" ng-model="model.input">\n' +
                    '<div>{{model.input}}</div>\n    \n</div>',
                link: function(scope, element){
                    scope.$watch('model.input', function(value){
                        if(value === 'password'){
                            console.log('change password.');
                            element.children(1).toggleClass('alert-box alert');
                        }
                    });
                }
            };
        }
    );

    if(debug){
        console.log('directive("photoFlip") defined');
    }    

//    // Carousel Directive
//    angular
//        .module('app')
//        .directive('carousel', 
//        function() {
//            return {
//                restrict: 'EA',
//                transclude: true,
//                replace: true,
//                controller: 'photosController',
//                require: 'carousel',
//                templateUrl: 'partials/carousel/carousel.html',
//                scope: {
//                interval: '=',
//                noTransition: '=',
//                noPause: '='
//                }
//            };
//        }
//    );
//
//    if(debug){
//        console.log("directive('carousel') defined");
//    }    
//
//    angular
//        .module('app')
//        .directive('slide', 
//        function() {
//            return {
//                require: '^carousel',
//                restrict: 'EA',
//                transclude: true,
//                replace: true,
//                templateUrl: 'partials/carousel/slide.html',
//                scope: {
//                    active: '=?',
//                    index: '=?'
//                },
//                link: function (scope, element, attrs, carouselCtrl) {
//                    carouselCtrl.addSlide(scope, element);
//                    //when the scope is destroyed then remove the slide from the current slides array
//                    scope.$on('$destroy', function() {
//                        carouselCtrl.removeSlide(scope);
//                    });
//
//                    scope.$watch('active', function(active) {
//                        if (active) {
//                            carouselCtrl.select(scope);
//                        }
//                    });
//                }
//            };
//        }
//    );
//
//    if(debug){
//        console.log("directive('slide') defined");
//    }    
//
//    angular
//        .module('app')
//        .animation('.item', 
//        ['$animate'],
//        function ($animate) {
//            return {
//                beforeAddClass: function (element, className, done) {
//                    // Due to transclusion, noTransition property is on parent's scope
//                    if (className == 'active' && element.parent() &&
//                    !element.parent().scope().noTransition) {
//                        var stopped = false;
//                        var direction = element.isolateScope().direction;
//                        var directionClass = direction == 'next' ? 'left' : 'right';
//                        element.addClass(direction);
//                        $animate.addClass(element, directionClass).then(function () {
//                            if (!stopped) {
//                                element.removeClass(directionClass + ' ' + direction);
//                            }
//                            done();
//                        });
//
//                        return function () {
//                            stopped = true;
//                        };
//                    }
//                    done();
//                },
//                beforeRemoveClass: function (element, className, done) {
//                    // Due to transclusion, noTransition property is on parent's scope
//                    if (className == 'active' && element.parent() &&
//                    !element.parent().scope().noTransition) {
//                        var stopped = false;
//                        var direction = element.isolateScope().direction;
//                        var directionClass = direction == 'next' ? 'left' : 'right';
//                        $animate.addClass(element, directionClass).then(function () {
//                            if (!stopped) {
//                                element.removeClass(directionClass);
//                            }
//                            done();
//                        });
//                        return function () {
//                            stopped = true;
//                        };
//                    }
//                    done();
//                }
//            };
//        }
//    );
// 
//    if(debug){
//        console.log("$animate function defined");
//    }

}());


/**
 * @ngdoc directive
 * @name ui.bootstrap.carousel.directive:carousel
 * @restrict EA
 *
 * @description
 * Carousel is the outer container for a set of image 'slides' to showcase.
 *
 * @param {number=} interval The time, in milliseconds, that it will take 
 *     the carousel to go to the next slide.
 * @param {boolean=} noTransition Whether to disable transitions on the 
 *     carousel.
 * @param {boolean=} noPause Whether to disable pausing on the carousel 
 *    (by default, the carousel interval pauses on hover).
 *
 * @example
<example module="ui.bootstrap">
  <file name="index.html">
    <carousel>
      <slide>
        <img src="http://placekitten.com/150/150" style="margin:auto;">
        <div class="carousel-caption">
          <p>Beautiful!</p>
        </div>
      </slide>
      <slide>
        <img src="http://placekitten.com/100/150" style="margin:auto;">
        <div class="carousel-caption">
          <p>D'aww!</p>
        </div>
      </slide>
    </carousel>
  </file>
  <file name="demo.css">
    .carousel-indicators {
      top: auto;
      bottom: 15px;
    }
  </file>
</example>
*/

/*****************************************************************************
 ** END OF FILE - test.directive.js
 ****************************************************************************/
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
