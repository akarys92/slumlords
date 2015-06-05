(function(){
	'use strict';
	angular
		.module('slumlords.main.controllers')
		.controller('HomeController', HomeController);
	HomeController.$inject = ['$location', '$scope', 'Main'];

	function HomeController ($location, $scope, Main){
		var vm = this;
		vm.properties = [];

		getProps();

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
	}
})();
