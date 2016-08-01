;(function(){
	angular.module('regionapp')
		.directive('draggable', ['$timeout',draggable]);

	function draggable($timeout){
		return {
			restrict: 'A',
			link: function(scope, elem, attr){
				$timeout(function(){
					elem.draggable();
				})
			}
		}

	}
})();