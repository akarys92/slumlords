(function(){
	'use strict';
	angular
		.module('slumlords', [
			'slumlords.config',
			'slumlords.routes',
			'slumlords.main',
			'ui.bootstrap'
		]);
	angular
		.module('slumlords.routes', ['ngRoute']);
	angular
		.module('slumlords.config', []);

	angular
		.module('slumlords')
		.run(run);

	run.$inject = ['$http'];

/**
* @name run
* @desc Update xsrf $http headers to align with Django's defaults
*/
	function run($http) {
	  $http.defaults.xsrfHeaderName = 'X-CSRFToken';
	  $http.defaults.xsrfCookieName = 'csrftoken';
	}
})();
