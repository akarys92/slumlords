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
		};
		return Main;

		function createLandLord(first_name, last_name, address, review){
			return $http.post('/api/landlords/', {
				first_name: first_name,
				last_name: last_name,
				address: address,
				review: review
			});
		}

		function getProps() {

			return $http.get('/api/properties/'); /*.
				success(function(data, status, headers, config) {
					//console.log(data);
					return data;
				}).
				error(function(data, status, headers, config) {
					alert("Blew up");
					return;
				});*/
			//return props;

		}
	}
})();


