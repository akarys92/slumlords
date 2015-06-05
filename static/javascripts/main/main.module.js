(function(){
	'use strict';
	angular
		.module('slumlords.main', [
			'slumlords.main.controllers',
			'slumlords.main.services'
		]);
	angular
		.module('slumlords.main.controllers', []);
	angular
		.module('slumlords.main.services', ['ngCookies'])
})();
