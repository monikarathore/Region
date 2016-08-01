;(function() {
	'use strict';
	angular
		.module('main.controller', [])
		.controller('MainController', ['$scope', '$window', '$timeout', '$mdToast', '$document', 'CanvasService', MainController]);


	function MainController($scope, $window, $timeout, $mdToast, $document, CanvasService) {
		var self = this;
		var canvas = CanvasService.getCanvas('canvasid');

		// get default scope for regions
		$scope.region = CanvasService.getScopeRegion();
		
		// Selectbox field options for website
		$scope.targetopt = CanvasService.getOptions();
		$scope.regiontypeLabel = "Region Editor";
		$scope.regionsimages = null;
		$scope.isCanvasVisible = false;
		$scope.activated = true;
		$scope.filename = "1-regions";
		$scope.imgpath = './assets/images/1.jpg';
		$scope.storedImageResources = null;
		$scope.initialval = 0;
		$scope.increment = 10;
		// $scope.regionId = null;
		/*Angular image element for get height and width in future reference*/
		var angularEle = angular.element('#jcl-demo');

		CanvasService.getImages().$promise.then(function(res){
			$scope.storedImageResources = res.imageoject;
			$scope.regionsimages = $scope.storedImageResources.slice($scope.initialval, $scope.increment);
			$timeout(function(){
				CanvasService.resizeCanvas(canvas, angularEle.width(), angularEle.height());
			},200);
		})
		/*
		* load regions from json.
		*/
		CanvasService.getRegionData($scope.filename).then(function(res){
			// $timeout(function(){
			// 	CanvasService.resizeCanvas(canvas, angularEle.width(), angularEle.height());
			// },200);
			if(res.data != undefined && res.data != ''){
				CanvasService.loadJson(canvas, res.data);
				$scope.activated = false;
				$mdToast.show( $mdToast.simple().theme("success-toast").textContent('Filled Canvas').position('top right').hideDelay(3000) );
			}else{
				$mdToast.show( $mdToast.simple().theme("error-toast").textContent('Empty Canvas').position('top right').hideDelay(3000) );
				$scope.activated = false;
			}
		}, function (err) {
			$mdToast.show( $mdToast.simple().theme("error-toast").textContent('File not found').position('top right').hideDelay(3000) );
			$scope.activated = false;
		});

		$document.bind('keydown', function(e) {
		  if(e.which === 46 && canvas.getActiveObject()){
			canvas.getActiveObject().remove();
		  }
		});

		canvas.on('object:selected', function(e){
			e.target.bringToFront();
			$timeout(function(){
				$scope.regiontypeLabel = e.target.regiontype;
				$scope.regiontype = e.target.regiontype; // this is to check on keypress evnet.
				$scope.region.target = e.target.target;
				$scope.isCanvasVisible = true;
			})
			// console.log(e.target);
		});

		canvas.on('before:selection:cleared', function(e){
			$timeout(function(){
				$scope.isCanvasVisible = false;
			})
		});

		$scope.saveRegion = function(){
			var formatjson = CanvasService.formateJson(canvas, $scope.region.options.target);
			CanvasService.saveRegion(formatjson, $scope.filename, canvas);
		};

		$scope.cancelReset = function(){
			$scope.isCanvasVisible = false;
			var activeobject = canvas.getActiveObject();
			if(activeobject.newregion && activeobject.newregion !== undefined){
				canvas.getActiveObject().remove();
			}
			canvas.discardActiveObject();
		};
		
		$scope.setOptionsObject = function(type){
			var options = CanvasService.getRegionOptions(type);
			CanvasService.addRegion(canvas, options);
		}

		$scope.keyPressFunc = function(val){
			if(canvas.getActiveObject()){
				if($scope.regiontype === 'website'){
					canvas.getActiveObject().setOptions({"options":{"target": $scope.region.options.target} });
				}
				canvas.getActiveObject().setOptions({"target": val});
			}
		};

		$scope.loadregion = function(ind){
			canvas.clear();
			$scope.activated = true;
			$scope.imgpath = this.imgs.img;
			$scope.filename = ind+"-regions";
			$scope.isCanvasVisible = false;
			CanvasService.getRegionData($scope.filename).then(function(res){
				if(res.data != undefined && res.data != ''){
					CanvasService.loadJson(canvas, res.data);
					$scope.activated = false;
					$mdToast.show( $mdToast.simple().theme("success-toast").textContent('Filled Canvas').position('top right').hideDelay(3000) );
				}else{
					$mdToast.show( $mdToast.simple().theme("error-toast").textContent('Empty Canvas').position('top right').hideDelay(3000) );
					$scope.activated = false;
				}
			}, function (err) {
				$mdToast.show( $mdToast.simple().theme("error-toast").textContent('Empty Canvas').position('top right').hideDelay(3000) );
				$scope.activated = false;
			});
			$timeout(function(){
				CanvasService.resizeCanvas(canvas, angular.element('.mid').width(), angular.element('.mid').height());
			})
		}

		$scope.previousthumb = function(){
			canvas.clear();
			if($scope.initialval > 0){
				$scope.initialval = $scope.initialval - 10;
				$scope.increment = $scope.increment - 10;
				$scope.regionsimages = $scope.storedImageResources.slice($scope.initialval, $scope.increment);
				$scope.filename = $scope.initialval+1+'-regions';
				// $scope.imgpath = $scope.regionsimages[0].img;
				// $timeout(function(){
				// 	CanvasService.resizeCanvas(canvas, angularEle.width(), angularEle.height());
				// },200);
				// CanvasService.getRegionData($scope.filename).then(function(res){
				// 	if(res.data != undefined && res.data != ''){
				// 		CanvasService.loadJson(canvas, res.data);
				// 		$scope.activated = false;
				// 		$mdToast.show( $mdToast.simple().theme("success-toast").textContent('Filled Canvas').position('top right').hideDelay(3000) );
				// 	}else{
				// 		$mdToast.show( $mdToast.simple().theme("error-toast").textContent('Empty Canvas').position('top right').hideDelay(3000) );
				// 		$scope.activated = false;
				// 	}					
				// }, function (err) {
				// 	$mdToast.show( $mdToast.simple().theme("error-toast").textContent('Empty Canvas').position('top right').hideDelay(3000) );
				// 	$scope.activated = false;
				// });
			}else{
				$scope.initialval = $scope.initialval;
				$scope.increment = $scope.increment;
				return false;
			}
		}

		$scope.nextthumb = function(){
			canvas.clear();
			if($scope.increment < $scope.storedImageResources.length ){
				$scope.initialval = $scope.increment;
				$scope.increment = $scope.increment+10;
				$scope.regionsimages = $scope.storedImageResources.slice($scope.initialval, $scope.increment);
				$scope.filename = $scope.initialval+1+'-regions';
				// $scope.imgpath = $scope.regionsimages[0].img;
				// $timeout(function(){
				// 	CanvasService.resizeCanvas(canvas, angularEle.width(), angularEle.height());
				// },200);
				// CanvasService.getRegionData($scope.filename).then(function(res){
				// 	if(res.data !== undefined && res.data !== ''){
				// 		CanvasService.loadJson(canvas, res.data);
				// 		$scope.activated = false;
				// 		$mdToast.show( $mdToast.simple().theme("success-toast").textContent('Filled Canvas').position('top right').hideDelay(3000) );
				// 	}else{
				// 		$mdToast.show( $mdToast.simple().theme("error-toast").textContent('Empty Canvas').position('top right').hideDelay(3000) );
				// 		$scope.activated = false;
				// 	}					
				// }, function (err) {
				// 	$mdToast.show( $mdToast.simple().theme("error-toast").textContent('Empty Canvas').position('top right').hideDelay(3000) );
				// 	$scope.activated = false;
				// });
			}
			else{
					$scope.initialval = $scope.initialval;
					$scope.increment = $scope.increment;
					return false;
				}
		}

		$scope.previousRegion = function(filename){
			var getPath = parseInt(filename.match(/\d+/)[0]) - 1;
			// var filterfile = _.some($scope.regionsimages, function (data) {
			// 		return JSON.parse(data.imageid) === getPath;
			// });
			if(getPath > 0){
				canvas.clear();
				$scope.filename = getPath+'-regions';
				$scope.imgpath = "./assets/images/"+getPath+".jpg";
				$timeout(function(){
					CanvasService.resizeCanvas(canvas, angularEle.width(), angularEle.height());
				});
				CanvasService.getRegionData($scope.filename).then(function(res){
					if(res.data !== undefined && res.data !== ''){
						CanvasService.loadJson(canvas, res.data);
						$scope.activated = false;
						$mdToast.show( $mdToast.simple().theme("success-toast").textContent('Filled Canvas').position('top right').hideDelay(3000) );
					}else{
						$mdToast.show( $mdToast.simple().theme("error-toast").textContent('Empty Canvas').position('top right').hideDelay(3000) );
						$scope.activated = false;
					}					
				}, function (err) {
					$mdToast.show( $mdToast.simple().theme("error-toast").textContent('Empty Canvas').position('top right').hideDelay(3000) );
					$scope.activated = false;
				})
			}else{
				$mdToast.show( $mdToast.simple().theme("error-toast").textContent('Below range page limit').position('top right').hideDelay(3000) );	
				return false;
			}
		}

		$scope.nextRegion = function(filename){
			var getPath = parseInt(filename.match(/\d+/)[0]) + 1;
			// var filterfile = _.some($scope.regionsimages, function (data) {
			// 		return JSON.parse(data.imageid) === getPath;
			// });
			if(getPath <= $scope.storedImageResources.length){
				canvas.clear();
				$scope.filename = getPath+'-regions';
				$scope.imgpath = "./assets/images/"+getPath+".jpg";
				$timeout(function(){
					CanvasService.resizeCanvas(canvas, angularEle.width(), angularEle.height());
				},200);
				CanvasService.getRegionData($scope.filename).then(function(res){
					if(res.data !== undefined && res.data !== ''){
						CanvasService.loadJson(canvas, res.data);
						$scope.activated = false;
						$mdToast.show( $mdToast.simple().theme("success-toast").textContent('Filled Canvas').position('top right').hideDelay(3000) );
					}else{
						$mdToast.show( $mdToast.simple().theme("error-toast").textContent('Empty Canvas').position('top right').hideDelay(3000) );
						$scope.activated = false;
					}					
				}, function (err) {
					$mdToast.show( $mdToast.simple().theme("error-toast").textContent('Empty Canvas').position('top right').hideDelay(3000) );
					$scope.activated = false;
				})
			}else{
				$mdToast.show( $mdToast.simple().theme("error-toast").textContent('Exceeded page limit').position('top right').hideDelay(3000) );
			}
		}

		angular.element($window).bind('resize', function(){
			var wd = angular.element('.mid img').width();
			var ht = angular.element('.mid img').height();
			angular.element('.canvas-container,canvas').css({width:wd+'px', height:ht+'px'});
			alert('monika deployed');
		});

	}

})();
