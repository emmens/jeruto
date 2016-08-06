'use strict';

describe('Controller: RecipeDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('jerutoApp'));

  var RecipeDetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RecipeDetailCtrl = $controller('RecipeDetailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RecipeDetailCtrl.awesomeThings.length).toBe(3);
  });
});
