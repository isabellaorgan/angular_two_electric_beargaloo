describe('cf resource services', function() {
	var $httpBackend;
  var $ControllerConstructor;
  var $scope;
});

beforeEach(angular.mock.module('BearStreamApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var controller = $ControllerConstructor('BearsController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.bears)).toBe(true);
  });

  describe('cf resource object', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, _restResource_) {
      $httpBackend = _$httpBackend_;
      $restResource = _restResource_('test');
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    describe('get function', function() {
			it('should have a callback on data', function() {
				$httpBackend.expectGET('/api/test').respond(200, 'positive');
				$restResource.get(function(err, data) {
					expect(err).toBe(null);
					expect(data).toBe('positive');
				});
				httpBackend.flush();
			});
    });

   describe('update function', function() {
    it('should have a callback on data', function() {
      $httpBackend.expectPUT('/api/bears/1').respond(200);
      $httpBackend.flush();
    });
   });

		describe('delete function', function() {
		it('should have a callback on data', function () {
			$httpBackend.expectDELETE('/api/bears/1').respond(200, 'positive');
			$restResource.delete({1}, function(err, data) {
				expect(err).toBe(null);
				expect(data).toBe('positive');
			});
			$httpBackend.flush();
		});
	});

