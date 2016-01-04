module.exports = function(app) {
  app.directive('bearFormDirective', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: '/templates/bear_form_template.html',
      transclude: true,
      scope: {
        buttonText: '@',
        headingText: '@',
        formName: '@',
        bear: '=',
        save: '&'
      }
    };
  });
};
