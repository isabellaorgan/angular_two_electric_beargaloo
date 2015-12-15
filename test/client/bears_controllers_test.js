require(__dirname + '/../../app/js/entry');
require('angular-mocks');

describe('bears controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;
  var bear;

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

  describe('REST request functions', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('BearsController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should add an array to bears with a GET all', function() {
      $httpBackend.expectGET('/api/bears').respond(200, [{_id: 1, name: 'test bear'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.bears[0].name).toBe('test bear');
    });

    it('should be able to create a new bear', function() {
      $httpBackend.expectPOST('/api/bears', {name: 'test bear', fishPreference: 'Salmons', flavor: "grizzly"}).respond(200, {name: 'a different bear'});
      expect($scope.bears.length).toBe(0);
      expect($scope.newBear).toEqual($scope.defaults);
      $scope.newBear.name = 'test bear';
      $scope.create($scope.newBear);
      $httpBackend.flush();
      expect($scope.bears[0].name).toBe('a different bear');
      expect($scope.newBear).toEqual($scope.defaults);
    });

    it('should be able to update a bear', function() {
      var bear = {_id: 1, editing: true};
      $httpBackend.expectPUT('/api/bears/1').respond(200);
      $scope.update(bear);
      $httpBackend.flush();
      expect(bear.editing).toBe(false);
    });

    it('should be able to delete a bear', function () {
      var bear = {_id: 1, name: 'test bear'};
      $scope.bears = [bear];
      $httpBackend.expectDELETE('/api/bears/1').respond(200);
      $scope.remove(bear);
      $httpBackend.flush();
      expect($scope.bears.length).toBe(0);
    });
  });
});
