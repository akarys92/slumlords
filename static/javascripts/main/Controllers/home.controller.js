(function(){
	'use strict';
	angular
		.module('slumlords.main.controllers')
		.controller('HomeController', HomeController);
	HomeController.$inject = ['$location', '$scope', 'Main'];

	function HomeController ($location, $scope, Main){
		var home = this;
		//Local Vars
		home.properties = [];
		home.landlords = [];
		home.currLandlord = {};
		home.addProp = false;
		home.map = {};

		//State Vars
		home.context = 'Map';
		home.cutType = 'Address';

		//Functions
		home.getLandlordById = getLandlordById;
		home.hotAddProp = hotAddProp;

		//Init
		//getProps();
		getLandlords();

		//definitions
		function getProps() {
			var props = Main.getProps();
			props.success(function(data, status, headers, config){
				console.log(data);
				home.properties = data;
			}).
			error(function(data, status, headers, config){
				alert("Poop!");
			});

		}
		function getLandlords() {
			var lls = Main.getLandlords()
			lls.success(function(data, status, headers, config){
				console.log(data);
				home.landlords = data;
				//home.currLandlord = data[0];
			}).
			error(function(data, status, headers, config){
				alert("Poop!");
			});
		}
		function getLandlordById(id) {
			var currId = home.landlords[id].id;

			home.currLandlord = buildCurrLandlord(id);

		}
		
		function buildCurrLandlord(id) {

			var dataObjResponse = Main.getDataObj(id);
			dataObjResponse.success(function(data, status, headers, config){
				console.log(data);
				var name = data.landlord.first_name + " " + data.landlord.last_name;
				home.currLandlord = {first_name: data.landlord.first_name, last_name: data.landlord.last_name, name: name, properties: data.properties};
				//buildMap();
			}).
			error(function(data, status, headers, config){
				alert("pooop");
			});
		}

		function hotAddProp(){
			if(home.address && home.city && home.state && home.zip && home.review){
				var geoObj = Main.getLatLong(Main.geoRequestString(home.address, home.city, home.state, home.zip));
				var firstName = home.currLandlord.first_name;
				var lastName = home.currLandlord.last_name;
				geoObj.success(function(data, status, headers, config){
						var aptNum = " ";
						if (home.aptNum) {
							aptNum = home.aptNum;
						}
						console.log(data);
						var lat = data.results[0].geometry.location.lat;
						var lng = data.results[0].geometry.location.lng;


						var mes = Main.createLandLord(firstName, lastName, home.address, home.aptNum, home.city, home.state, home.zip, home.review, lat, lng);
						if(mes.errors) {
							home.err = mes.errors;
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
