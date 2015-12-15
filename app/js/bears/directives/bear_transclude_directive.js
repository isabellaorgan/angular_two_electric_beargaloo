module.exports = function(app) {
	app.directive('bearTransclude', function() {
		return {
			restrict: 'AC',
			templateUrl: '/templates/bear_transclude_directive',
			replace: true,
			transclude: true,
			scope: {
				messageOne: '@'
			}

		};
	});
};