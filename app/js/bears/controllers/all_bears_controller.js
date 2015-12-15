
module.exports = function(app) {
  app.controller('AllBearsController', ['$scope, $http', function($scope, $http) {
    $http.get('/api/allbears')
      .then(function(res) {
        $scope.bears = res.data;
      }, function(err) {
        console.log(err);
      });
  }]);
};
