;(function(){
    'use strict';
        angular.module('regionapp')
            .directive('elresize', function($window) {
                return function($scope) {
                    $scope.initializeWindowSize = function() {
                        $scope.windowHeight = $window.innerHeight;
                        $scope.windowWidth = $window.innerWidth;
                        
                        var cal = {
                            "wd":$scope.windowWidth,
                            "ht": $scope.windowHeight
                        };
                        // console.log('directive', cal);
                        return cal;
                    };
                    $scope.initializeWindowSize();
                    return angular.element($window).bind('resize', function() {
                            $scope.initializeWindowSize();
                            return $scope.$apply();
                    });
                };
            });

})();