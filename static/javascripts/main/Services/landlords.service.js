/**
Service for manipulating Landlord objects
**/
(function (){
	'use strict';
	angular
		.module('slumlords.main.services')
		.factory('Main', Main);
	Main.$inject = ['$cookies', '$http'];

	function Main($cookies, $http) {
		var Main = {
			createLandLord: createLandLord,
			getProps: getProps,
			getLandlords: getLandlords,
			getLandlordById: getLandlordById,
			getDataObj: getDataObj,
			getLatLong: getLatLong,
			geoRequestString: geoRequestString,
			getPropsByBounds: getPropsByBounds,
		};
		return Main;

		function createLandLord(first_name, last_name, address, aptNum, city, state, zip, review, lat, lng){

			return $http.post('/api/landlords/', {
				first_name: first_name,
				last_name: last_name,
				address: address,
				apartment_number: aptNum,
				city: city,
				state: state,
				zip: zip,
				lattitude: lat,
				longitude:lng,
				review: review
			});
		}

		function getProps() {
			return $http.get('/api/properties/');
		}
		function getLandlords() {
			return $http.get('/api/landlords/')
		}
		function getLandlordById(id) {
			//something funky with indexing here
			id = id + 1;
			return $http.get('api/landlord_by_id/' + id);
		}
		function getDataObj(id) {
			id = id+1;
			return $http.get('api/property_info/' + id);
		}
		function getLatLong(reqString) {
			//Take this out!!!
			var apiKey = "AIzaSyBaUb0s9DdT1S2KpabaZmShWn_Dq3Ow06k";
			return $http.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + reqString + "&" + "key=" + apiKey);
		}
		function geoRequestString(address, city, state, zip) {
			address = address.replace(" ", "+");
			address = address + ",";

			city = city.replace(" ", "+");
			city = "+" + city + ",";

			state = "+" + state;

			return address + city + state;

		}
		function getPropsByBounds(neLat, neLong, swLat, swLong) {
			return $http.get('/api/property_by_bounds/neLat=' + neLat + '&neLong=' + neLong + '&swLat=' + swLat + '&swLong=' + swLong);
		}
	}
})();


