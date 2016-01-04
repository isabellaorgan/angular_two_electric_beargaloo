module.exports = function(app) {
  app.controller('SignupController', ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location) {
    $scope.headingText = 'Creating a new user!! Hooray!!1';
    $scope.buttonText = 'Create User';
    $scope.authenticat = function(user) {
      $http.post('/api/signup', user)
        .then(function(res) {
          $cookies.put('token', res.data.token);
          $scope.getUser();
          $location.path('/bears');
        }, function(err) {
          console.log(err, data);
        });
    };

    $scope.changePlaces = function() {
      $location.path('/signin');
    };
  }]);
};