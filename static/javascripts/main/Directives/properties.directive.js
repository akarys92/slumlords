angular.module('slumlords.main.directives').directive('slumProps', function(){
	return {
		scope: false,
		templateUrl: '/static/templates/directives/propertiesTile.html',
		controller: 'propertiesController',
		controllerAs: 'vm'
	}
})
.controller('propertiesController', function propertiesController($scope, $location, $Main) {

});