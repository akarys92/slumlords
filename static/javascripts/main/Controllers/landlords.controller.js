(function(){
	'use strict';
	angular
		.module('slumlords.main.controllers')
		.controller('LandLordController', LandLordController);
	LandLordController.$inject = ['$location', '$scope', 'Main'];

	function LandLordController($location, $scope, Main) {
		var vm = this;
		vm.count = 10;
		vm.createLandLord = createLandLord;
		vm.err;

		function createLandLord() {
			if(vm.first_name && vm.last_name && vm.address && vm.city && vm.state && vm.zip && vm.review){
				var requestString = Main.geoRequestString(vm.address, vm.city, vm.state, vm.zip);
				var geoObj = Main.getLatLong(requestString);
				geoObj.success(function(data, status, headers, config){
					var aptNum = " ";
					if (vm.aptNum) {
						aptNum = vm.aptNum;
					}
					console.log(data);
					var lat = data.results[0].geometry.location.lat;
					var lng = data.results[0].geometry.location.lng;

					//console.log(lat);
					//console.log(lng);
					console.log("Apartment number: " + aptNum);

					var mes = Main.createLandLord(vm.first_name, vm.last_name, vm.address, aptNum, vm.city, vm.state, vm.zip, vm.review, lat, lng);
					if(mes.errors) {
						vm.err = mes.errors;
					}
					else {
						$location.path('/');
					}
				}).error(function(data, status, headers, config){
					alert("Location not found");
				});
			}
			else {
				vm.err = "Please fill in all fields!"
			}
			
		}

	}
})();