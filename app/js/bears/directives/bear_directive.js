module.exports = function(app) {
	app.directive('bearDirective', function() {
		return {
			restrict: 'AC',
			replace: true,
			templateUrl: '/templates/bear_directives_template.html',
			scope: {
				bear: '=',
			}
		};
	});
};