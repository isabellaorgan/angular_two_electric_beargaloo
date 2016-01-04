module.exports = function(app) {
  app.directive('bearDirective', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: '/templates/bear_directive_template.html',
      scope: {
        bear: '=',
      }
    };
  });
};