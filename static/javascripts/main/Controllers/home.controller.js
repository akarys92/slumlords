(function(){
	'use strict';
	angular
		.module('slumlords.main.controllers')
		.controller('HomeController', HomeController);
	HomeController.$inject = ['$location', '$scope', 'Main'];

	function HomeController ($location, $scope, Main){
		var vm = this;
		//Local Vars
		vm.properties = [];
		vm.landlords = [];
		vm.currLandlord = {};
		vm.addProp = false;
		vm.map = {};
		vm.cutType = 'Address';

		//Functions
		vm.getLandlordById = getLandlordById;
		vm.hotAddProp = hotAddProp;

		//Init
		//getProps();
		getLandlords();

		//definitions
		function getProps() {
			var props = Main.getProps();
			props.success(function(data, status, headers, config){
				console.log(data);
				vm.properties = data;
			}).
			error(function(data, status, headers, config){
				alert("Poop!");
			});

		}
		function getLandlords() {
			var lls = Main.getLandlords()
			lls.success(function(data, status, headers, config){
				console.log(data);
				vm.landlords = data;
				//vm.currLandlord = data[0];
			}).
			error(function(data, status, headers, config){
				alert("Poop!");
			});
		}
		function getLandlordById(id) {
			var currId = vm.landlords[id].id;

			vm.currLandlord = buildCurrLandlord(id);

		}
		
		function buildCurrLandlord(id) {

			var dataObjResponse = Main.getDataObj(id);
			dataObjResponse.success(function(data, status, headers, config){
				console.log(data);
				var name = data.landlord.first_name + " " + data.landlord.last_name;
				vm.currLandlord = {first_name: data.landlord.first_name, last_name: data.landlord.last_name, name: name, properties: data.properties};
				//buildMap();
			}).
			error(function(data, status, headers, config){
				alert("pooop");
			});
		}

		function hotAddProp(){
			if(vm.address && vm.city && vm.state && vm.zip && vm.review){
				var geoObj = Main.getLatLong(Main.geoRequestString(vm.address, vm.city, vm.state, vm.zip));
				var firstName = vm.currLandlord.first_name;
				var lastName = vm.currLandlord.last_name;
				geoObj.success(function(data, status, headers, config){
						var aptNum = " ";
						if (vm.aptNum) {
							aptNum = vm.aptNum;
						}
						console.log(data);
						var lat = data.results[0].geometry.location.lat;
						var lng = data.results[0].geometry.location.lng;


						var mes = Main.createLandLord(firstName, lastName, vm.address, vm.aptNum, vm.city, vm.state, vm.zip, vm.review, lat, lng);
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

		}
	}
})();
