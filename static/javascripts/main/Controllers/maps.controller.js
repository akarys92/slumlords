(function(){
	'use strict';
	angular
		.module('slumlords.main.controllers')
		.controller('MapsController', MapsController);
	MapsController.$inject = ['$location', '$scope', 'Main'];

	function MapsController($scope, $location, Main) {
		
		google.maps.event.addDomListener(window, 'load', buildMap);

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
			vm.map = map;
			console.log(vm.map.getBounds().getNorthEast().lat())
		};
		buildMap();
	}

})();
