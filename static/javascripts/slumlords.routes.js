(function(){
     'use strict';
     angular
          .module('slumlords.routes')
          .config(config);
     config.$inject = ['$routeProvider'];
     function config($routeProvider) {
          $routeProvider.when('/createLandLord', {
                    controller: 'LandLordController', 
                    controllerAs: 'vm',
                    templateUrl: '/static/templates/main/createLandLord.html'
          })
          .when('/home',{
               controller: 'HomeController',
               controllerAs: 'home',
               templateUrl: '/static/templates/main/home.html'
          })
          .otherwise('/home');

     }
})();