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