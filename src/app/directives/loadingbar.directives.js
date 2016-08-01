;(function(){
	angular.module('regionapp')
		.directive('loadingbar', ['$document',loadingbar]);

	function loadingbar($document){
		return {
			restrict: 'E',
			scope: {
				isvisible:"=",
			},
			template:`<div class="loadercontainer" ng-show="isvisible">
					<section class="loadercls">
						<md-progress-circular md-diameter="100" md-mode="indeterminate"></md-progress-circular>
					</section>
				</div>`,
			link: function(scope, elem, attr){
				if(scope.isvisible){
					angular.element($document[0].body).css({'overflow':'hidden'});
				}else{
					angular.element($document[0].body).css({'overflow':''});
				}
			}
		}

	}
})();