require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');
var angular = window.angular;

var bearStreamApp = angular.module('BearStreamApp', ['ngRoute', 'ngCookies', 'base64']);
require('./filters/filters')(bearStreamApp);
require('./services/services')(bearStreamApp);
require('./controllers/controller')(bearStreamApp);
require('./directives/directives')(bearStreamApp);
require('./bears/bears')(bearStreamApp);
require('./auth/auth')(bearStreamApp);


bearStreamApp.config(['$routeProvider', function($route) {
	$route
		.when('/bears', {
			templateUrl: '/templates/bears_view.html',
			controller: 'BearsController'
		})
		.when('/signup', {
			templateUrl: '/templates/auth_view.html',
			controller: 'SignupController'
		})
		.when('/signin', {
			templateUrl: '/templates/auth_view.html',
			controller: 'SigninController'
		})
		.when('/allbears', {
			templateUrl: '/templates/all_bears.html',
			controller: 'AllBearsController'
		})
		.otherwise({
			redirectTo: '/signup'
		});
}]);
