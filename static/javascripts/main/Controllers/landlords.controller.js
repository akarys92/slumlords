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
			var mes = Main.createLandLord(vm.first_name, vm.last_name, vm.address, vm.review);
			if(mes.errors) {
				vm.err = mes.errors;
			}
			else {
				$location.path('/');
			}
		}

	}
})();