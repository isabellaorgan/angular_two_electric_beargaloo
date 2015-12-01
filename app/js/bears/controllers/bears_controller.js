module.exports = function(app) {
	app.controller('BearsController', ['$scope', '$http', function($scope, $http) {
		$scope.bears = [];
		$scope.error = [];
		$scope.newBear = null;

		$scope.getAll = function() {
			$http.get('/api/bears')
				.then(function(res) {
					$scope.bears = res.data;
				}, function(err) {
					console.log(err.data);
				});
		};

		$scope.create = function(bear) {
			$http.post('/api/bears', bear)
				.then(function(res) {
					$scope.bears.push(res.data);
					$scope.newBear = null;
				}, function(err) {
					console.log(err.data);
			});

		};

		$scope.update = function(bear) {
			bear.editing = false;
			$http.put('/api/bears/' + bear._id, bear)
				.then(function(res) {
					console.log('this bear has a new identity (bear placed in witness protection');
				}, function(err) {
					$scope.errors.push('could not get bear: ' + bear.name + ' to bear trial');
					console.log(err.data);
				});
		};

		$scope.remove = function(bear) {
			$scope.bears.splice($scope.bears.indexOf(bear), 1);
			$http.delete('/api/bears/' + bear._id)
			.then(function(res) {
				console.log('totes cool, bear murdered');
			}, function(err) {
				console.log(err.data);
				$scope.errors.push('could not murder bear: ' + bear.name);
				$scope.getAll();
			});
		};
	}]);
};