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

		//Functions
		vm.getLandlordById = getLandlordById;
		vm.hotAddProp = hotAddProp;

		//Init
		getProps();
		getLandlords();
		google.maps.event.addDomListener(window, 'load', buildMap);
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
				buildMap();
			}).
			error(function(data, status, headers, config){
				alert("pooop");
			});
		}

		function buildMap() {
			var mapOptions ={
				center: new google.maps.LatLng(44.5403, -78.5463),
				zoom: 4
			};
			var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
			var markers = [];

			for (var prop in vm.currLandlord.properties) {
				var property = vm.currLandlord.properties[prop];
				var lat = property.lattitude;
				var lng = property.longitude;

				console.log(property);
				console.log(lng);

				var myLatlng = new google.maps.LatLng(lat, lng);
				var marker = new google.maps.Marker({
				      position: myLatlng,
				      map: map,
				      title: 'Hello World!'
				});
				var llName = vm.currLandlord.name + " " + vm.currLandlord.last_name;
				var review = property.review;
				var address = property.street_address;

				var card = buildPropCard(llName, review, address);
				var infoWindow = new google.maps.InfoWindow({
					content: card
				});
				google.maps.event.addListener(marker, 'click', function() {
    					infoWindow.open(map,marker);
  				});

				markers.push(marker);
			}

			var bounds = new google.maps.LatLngBounds();
			for(var i in markers) {
				bounds.extend(markers[i].getPosition());
			}

			map.setCenter(bounds.getCenter());
			map.fitBounds(bounds);
			map.setZoom(map.getZoom() - 1);
		}

		function buildPropCard(name, review, address) {
			var output = '<div class="property-card"><div class="header"><h3>' + address + '</h3></div><div class="body"><table><tr><td>Owner: </td><td>' + name + '</td></tr><tr><td>Property Review: </td><td>' + review + '</td></tr></table></div></div>';
			return output;
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
