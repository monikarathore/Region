;(function(){
angular.module('regionapp')
.directive('getHeight', ["$timeout", function($timeout) {
    return {
        restrict: 'A',
        scope:{
          divHeight: '='
        },
        link: function(scope, element, attr) {
            scope.height = element.prop('offsetHeight');
            scope.width = element.prop('offsetWidth');
        }
    };
	}]);
})();