var angular = window.angular;
module.exports = function(app) {
  app.controller('BearsController', ['$scope', '$http', 'cfResource', '$location', function($scope, $http, cfResource, $location) {
    $scope.bears = [];
    $scope.errors = [];
    $scope.defaults = {flavor: 'grizzly', fishPreference: 'Salmons'};
    $scope.newBear = angular.copy($scope.defaults);
    $scope.messageOne = "Hello from inside the controller!";
    var bearsResource = cfResource('bears');

    if (!$scope.token)
      $location.path('/signup');

    $scope.getAll = function() {
      bearsResource.getAll(function(err, data) {
        if (err) return err;

        $scope.bears = data;
      });
    };

    $scope.create = function(bear) {
      bearsResource.create(bear, function(err, data){
        if (err) return err;
        $scope.bears.push(data);
        $scope.newBear = angular.copy($scope.defaults);
      });
    };

    $scope.update = function(bear) {
      bear.editing = false;
      $http.put('/api/bears/' + bear._id, bear)
        .then(function(res) {
          console.log('this bear has a new identity (placed in bear witness protection)');
        }, function(err) {
          $scope.errors.push('could not get bear: ' + bear.name + ' to bear trial');
          console.log(err.data);
        });
    };

		$scope.edit = function(bear) {
			bear.editing = !bear.editing;
			bear.currentName = bear.name;
		};

		$scope.cancel = function(bear) {
			bear.name = bear.currentName;
		};

    $scope.remove = function(bear) {
      $scope.bears.splice($scope.bears.indexOf(bear), 1);
      $http.delete('/api/bears/' + bear._id)
        .then(function(res) {
          console.log('totes cool, bear murdered');
        }, function(err) {
          console.log(err.data);
          $scope.errors.push('could not murderererer bearzzz: ' + bear.name);
          $scope.getAll();
        });
    };
  }]);
};