require('angular/angular');
require('angular-route');
var angular = window.angular;

var bearStreamApp = angular.module('BearStreamApp', ['ngRoute']);
require('./filters/filters')(bearStreamApp);
require('./services/services')(bearStreamApp);
require('./controllers/controller')(bearStreamApp);
require('./directives/directives')(bearStreamApp);
require('./bears/bears')(bearStreamApp);

bearStreamApp.config(['$routeProvider', function($route) {
	$route
		.when('/bears', {
			templateUrl: '/templates/bears_view.html',
			controller: 'BearsController'
		})
		.otherwise({
			redirectTo: '/bears'
		});
}]);
