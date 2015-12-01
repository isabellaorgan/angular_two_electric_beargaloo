require('angular/angular');
var angular = window.angular;

var bearStreamApp = angular.module('BearStreamApp', []);
require('./controllers/controller')(bearStreamApp);
require('./bears/bears')(bearStreamApp);