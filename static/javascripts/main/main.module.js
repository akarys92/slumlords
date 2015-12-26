(function(){
	'use strict';
	angular
		.module('slumlords.main', [
			'slumlords.main.controllers',
			'slumlords.main.services',
			'slumlords.main.directives'
		]);
	angular
		.module('slumlords.main.controllers', []);
	angular
		.module('slumlords.main.services', ['ngCookies']);
	angular
		.module('slumlords.main.directives', []);
})();
