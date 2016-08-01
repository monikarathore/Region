(function(){
	'use strict';
	angular.module('regionapp')
		.factory('SavefileResourceGateway', ['$resource', SavefileResourceGateway]);

		function SavefileResourceGateway($resource) {
			
			var regiongetDataResource = $resource('./app/services/image_resp.json', {}, {
				getImageData: {method: 'GET'}
			});
			
			var regionpostRegionData = $resource('./server_script/save_json.php', {param: '@myParam'}, {
				postRegionData: {method: 'POST'}
			});

			return {
				getImageData: regiongetDataResource.getImageData,
				postRegionData: regionpostRegionData.postRegionData
			};
		}

})();