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
                'ui.calendar',
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

                /* homeless */
                .state('homeless', {
                    controller: 'homelessController',
                    templateUrl: 'partials/homeless/homeless.html',
                    url: '/homeless'
                })

                /* volunteers */
                .state('volunteer', {
                    controller: 'volunteerController',
                    templateUrl: 'partials/volunteer/volunteer.carousel.html',
                    url: '/volunteer'
                })


                /* Register */
                .state('register', {
                    controller: 'userController',
                    templateUrl: 'partials/account/register.html',
                    url: '/register'
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
                    .when('/homeless/:homelessName', '/partials/homeless/:id')
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
                    $rootScope.endPoint = 'http://maintz.com';
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
 ** Filename    : ui.calendar.controller.js
 **
 *****************************************************************************
 ****************************************************************************/

/*
*  AngularJs Fullcalendar Wrapper for the JQuery FullCalendar
*  API @ http://arshaw.com/fullcalendar/
*
*  Angular Calendar Directive that takes in the [eventSources] nested array object as the ng-model and watches it deeply changes.
*       Can also take in multiple event urls as a source object(s) and feed the events per view.
*       The calendar will watch any eventSource array and update itself when a change is made.
*
*/

(function () {
    'use strict';

    var uiCalendar = angular.module('ui.calendar', []);
    if(debug){
        console.log('ui.calendar defined');
    }

    uiCalendar.constant('uiCalendarConfig', {calendars: {}});
    if(debug){
        console.log('uiCalendarConfig defined');
    }

    uiCalendar.controller('uiCalendarController', [
                    '$timeout', '$locale', 
            function($timeout,   $locale){

        var vm = this;
            
        if(debug){
            console.log('uiCalendarController activated');
        }  

        var sources = vm.eventSources,
            extraEventSignature = vm.calendarWatchEvent ? vm.calendarWatchEvent : angular.noop,
            wrapFunctionWithScopeApply = function(functionToWrap){
                var wrapper;
                if (functionToWrap){
                    wrapper = function(){
                        // This happens outside of angular context so we need to wrap it in a timeout which has an implied apply.
                        // In this way the function will be safely executed on the next digest.
                        var args = arguments;
                        var _this = this;
                        $timeout(function(){
                            functionToWrap.apply(_this, args);
                        });
                    };
                }
                return wrapper;
            };
            
        var eventSerialId = 1;
        // @return {String} fingerprint of the event object and its properties
        this.eventFingerprint = function(e) {
            if (!e._id) {
                e._id = eventSerialId++;
            }
            // This extracts all the information we need from the event. http://jsperf.com/angular-calendar-events-fingerprint/3
            return '' + e._id + (e.id || '') + (e.title || '') + (e.url || '') + (+e.start || '') + (+e.end || '') +
                (e.allDay || '') + (e.className || '') + extraEventSignature(e) || '';
        };

        var sourceSerialId = 1, sourceEventsSerialId = 1;
        // @return {String} fingerprint of the source object and its events array
        this.sourceFingerprint = function(source) {
            var fp = '' + (source.__id || (source.__id = sourceSerialId++)),
                events = angular.isObject(source) && source.events;
            if (events) {
                fp = fp + '-' + (events.__id || (events.__id = sourceEventsSerialId++));
            }
            return fp;
        };

        // @return {Array} all events from all sources
        this.allEvents = function() {
            // do sources.map(&:events).flatten(), but we don't have flatten
            var arraySources = [];
            for (var i = 0, srcLen = sources.length; i < srcLen; i++) {
                var source = sources[i];
                if (angular.isArray(source)) {
                    // event source as array
                    arraySources.push(source);
                } else if(angular.isObject(source) && angular.isArray(source.events)){
                    // event source as object, ie extended form
                    var extEvent = {};
                    for(var key in source){
                        if(key !== '_id' && key !== 'events'){
                            extEvent[key] = source[key];
                        }
                    }
                    for(var eI = 0;eI < source.events.length;eI++){
                        angular.extend(source.events[eI],extEvent);
                        }
                    arraySources.push(source.events);
                }
            }
            return Array.prototype.concat.apply([], arraySources);
        };

        // Track changes in array of objects by assigning id tokens to each element and watching the scope for changes in the tokens
        // @param {Array|Function} arraySource array of objects to watch
        // @param tokenFn {Function} that returns the token for a given object
        // @return {Object}
        //  subscribe: function(scope, function(newTokens, oldTokens))
        //    called when source has changed. return false to prevent individual callbacks from firing
        //  onAdded/Removed/Changed:
        //    when set to a callback, called each item where a respective change is detected
        this.changeWatcher = function(arraySource, tokenFn) {
            var self;
            var getTokens = function() {
                var array = angular.isFunction(arraySource) ? arraySource() : arraySource;
                var result = [], token, el;
                for (var i = 0, n = array.length; i < n; i++) {
                    el = array[i];
                    token = tokenFn(el);
                    map[token] = el;
                    result.push(token);
                }
                return result;
            };

            // @param {Array} a
            // @param {Array} b
            // @return {Array} elements in that are in a but not in b
            // @example
            //  subtractAsSets([6, 100, 4, 5], [4, 5, 7]) // [6, 100]
            var subtractAsSets = function(a, b) {
                var result = [], inB = {}, i, n;
                for (i = 0, n = b.length; i < n; i++) {
                    inB[b[i]] = true;
                }
                for (i = 0, n = a.length; i < n; i++) {
                    if (!inB[a[i]]) {
                        result.push(a[i]);
                    }
                }
                return result;
            };

            // Map objects to tokens and vice-versa
            var map = {};

            // Compare newTokens to oldTokens and call onAdded, onRemoved, and onChanged handlers for each affected event respectively.
            var applyChanges = function(newTokens, oldTokens) {
                var i, n, el, token;
                var replacedTokens = {};
                var removedTokens = subtractAsSets(oldTokens, newTokens);
                for (i = 0, n = removedTokens.length; i < n; i++) {
                    var removedToken = removedTokens[i];
                    el = map[removedToken];
                    delete map[removedToken];
                    var newToken = tokenFn(el);
                    // if the element wasn't removed but simply got a new token, its old token will be different from the current one
                    if (newToken === removedToken) {
                        self.onRemoved(el);
                    } else {
                        replacedTokens[newToken] = removedToken;
                        self.onChanged(el);
                    }
                }

                var addedTokens = subtractAsSets(newTokens, oldTokens);
                for (i = 0, n = addedTokens.length; i < n; i++) {
                    token = addedTokens[i];
                    el = map[token];
                    if (!replacedTokens[token]) {
                        self.onAdded(el);
                    }
                }
            };
            self = {
                subscribe: function(scope, onArrayChanged) {
                    scope.$watch(getTokens, function(newTokens, oldTokens) {
                        var notify = !(onArrayChanged && onArrayChanged(newTokens, oldTokens) === false);
                        if (notify) {
                            applyChanges(newTokens, oldTokens);
                        }
                    }, true);
                },
                onAdded: angular.noop,
                onChanged: angular.noop,
                onRemoved: angular.noop
            };
            return self;
        };

        this.getFullCalendarConfig = function(calendarSettings, uiCalendarConfig){
            var config = {};

            angular.extend(config, uiCalendarConfig);
            angular.extend(config, calendarSettings);

            angular.forEach(config, function(value,key){
                if (typeof value === 'function'){
                    config[key] = wrapFunctionWithScopeApply(config[key]);
                }
            });

            return config;
        };

        this.getLocaleConfig = function(fullCalendarConfig) {
            if (!fullCalendarConfig.lang || fullCalendarConfig.useNgLocale) {
                // Configure to use locale names by default
                var tValues = function(data) {
                    // convert {0: 'Jan', 1: 'Feb', ...} to ['Jan', 'Feb', ...]
                    var r, k;
                    r = [];
                    for (k in data) {
                        r[k] = data[k];
                    }
                    return r;
                };
                var dtf = $locale.DATETIME_FORMATS;
                return {
                    monthNames: tValues(dtf.MONTH),
                    monthNamesShort: tValues(dtf.SHORTMONTH),
                    dayNames: tValues(dtf.DAY),
                    dayNamesShort: tValues(dtf.SHORTDAY)
                };
            }
            return {};
        };
    }]);

    if(debug){
        console.log('uiCalendarController defined');
    }

    uiCalendar.directive('uiCalendar', ['uiCalendarConfig', function(uiCalendarConfig) {
        return {
            restrict: 'A',
            scope: {eventSources:'=ngModel',calendarWatchEvent: '&'},
            controller: 'uiCalendarController',
            link: function(scope, elm, attrs, controller) {

                var sources = scope.eventSources,
                    sourcesChanged = false,
                    calendar,
                    eventSourcesWatcher = controller.changeWatcher(sources, controller.sourceFingerprint),
                    eventsWatcher = controller.changeWatcher(controller.allEvents, controller.eventFingerprint),
                    options = null;

                function getOptions(){
                    var calendarSettings = attrs.uiCalendar ? scope.$parent.$eval(attrs.uiCalendar) : {},
                        fullCalendarConfig;

                    fullCalendarConfig = controller.getFullCalendarConfig(calendarSettings, uiCalendarConfig);

                    var localeFullCalendarConfig = controller.getLocaleConfig(fullCalendarConfig);
                    angular.extend(localeFullCalendarConfig, fullCalendarConfig);
                    options = { eventSources: sources };
                    angular.extend(options, localeFullCalendarConfig);
                    //remove calendars from options
                    options.calendars = null;

                    var options2 = {};
                    for(var o in options){
                        if(o !== 'eventSources'){
                            options2[o] = options[o];
                        }
                    }
                    return JSON.stringify(options2);
                }

                    scope.destroy = function(){
                        if(calendar && calendar.fullCalendar){
                            calendar.fullCalendar('destroy');
                        }
                        if(attrs.calendar) {
                            calendar = uiCalendarConfig.calendars[attrs.calendar] = $(elm).html('');
                        } else {
                            calendar = $(elm).html('');
                        }
                    };

                scope.init = function(){
                    calendar.fullCalendar(options);
                    if(attrs.calendar) {
                        uiCalendarConfig.calendars[attrs.calendar] = calendar;
                    }          
                };

                eventSourcesWatcher.onAdded = function(source) {
                    calendar.fullCalendar('addEventSource', source);
                    sourcesChanged = true;
                };

                eventSourcesWatcher.onRemoved = function(source) {
                    calendar.fullCalendar('removeEventSource', source);
                    sourcesChanged = true;
                };

                eventSourcesWatcher.onChanged = function(source) {
                    console.log(source + ' changed');
                    calendar.fullCalendar('refetchEvents');
                    sourcesChanged = true;
                };

                eventsWatcher.onAdded = function(event) {
                    calendar.fullCalendar('renderEvent', event, (event.stick ? true : false));
                };

                eventsWatcher.onRemoved = function(event) {
                    calendar.fullCalendar('removeEvents', event._id);
                };

                eventsWatcher.onChanged = function(event) {
                    event._start = jQuery.fullCalendar.moment(event.start);
                    event._end = jQuery.fullCalendar.moment(event.end);
                    calendar.fullCalendar('updateEvent', event);
                };

                eventSourcesWatcher.subscribe(scope);
                eventsWatcher.subscribe(scope, function() {
                    if (sourcesChanged === true) {
                        sourcesChanged = false;
                        // return false to prevent onAdded/Removed/Changed handlers from firing in this case
                        return false;
                    }
                });

                scope.$watch(getOptions, function(newO,oldO){
                    console.log(newO,oldO);
                    scope.destroy();
                    scope.init();
                });
            }
        };
    }]);

    if(debug){
        console.log('uiCalendar defined');
    }

}());

/*****************************************************************************
 ** END OF FILE - ui.calendar.controller.js
 ****************************************************************************/

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
