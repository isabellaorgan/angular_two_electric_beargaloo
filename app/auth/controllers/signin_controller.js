module.exports = function(app) {
	app.controller('SigninController', ['$scope', '$http', '$cookies', '$location', '$base64', function($scope, $http, $cookies, $location, $base64) {
		$scope.headingText = 'Sign in to existing user';
		$scope.buttonText = 'Kenny Log Ins';

		$scope.authenticat = function(user) {
			$http.post({
				method: 'GET',
				url: '/api/signin',
				headers: {
					'Authorization': 'Basic ' + $base64.encode(user.username + ':' + user.password)
				}
			})
			.then(function(res) {
				$cookies.put('token', res.data.token);
				$scope.getUser(); //from auth controller
				$location.path('/bears');
			}, function(err) {
				console.log(err);
			});
		};

		$scope.changePlaces = function() {
			$location.path('/signup');
		};
	}]);
};