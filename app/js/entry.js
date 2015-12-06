require('angular/angular');
var angular = window.angular;

var bearStreamApp = angular.module('BearStreamApp', []);
require('./services/services')(bearStreamApp);
require('./controllers/controller')(bearStreamApp);
require('./bears/bears')(bearStreamApp);