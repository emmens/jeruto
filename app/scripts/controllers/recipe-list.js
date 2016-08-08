'use strict';

/**
 * @ngdoc function
 * @name jerutoApp.controller:RecipeListCtrl
 * @description
 * # RecipeListCtrl
 * Controller of the jerutoApp
 */
 angular.module('jerutoApp')
 .controller('RecipeListCtrl', function (Recipe, $timeout, $scope, $window) {

 	$scope.recipes = Recipe.query();
 	$scope.orderProp = 'name';
 	$scope.recipe =  new Recipe();
 	$scope.recipe.ingredients = [];
 	
    $scope.openNewForm = function () {
        $scope.newFormOpen = true;
    };

    $scope.closeNewForm = function () {
        $scope.newFormOpen = false;
    };

    $scope.openIngredientForm = function () {
        $scope.ingredientFormOpen = true;
    };

    $scope.closeIngredientForm = function () {
        $scope.ingredientFormOpen = false;
    };

    $scope.list = [];
    $scope.text = '';
    $scope.submit = function() {
    if ($scope.text) {
        $scope.list.push($scope.text);
        $scope.text = '';
    } 
  };

    $scope.appendIngredients = function() {
    	$scope.list.forEach(function(item, index) {
			if ($scope.recipe.ingredients.indexOf(item) == -1) { $scope.recipe.ingredients.push(item)}
    	})
    }
 	$scope.saveRecipe = function() {
 		Recipe.save($scope.recipe, function(recipe) {
			$window.location.href = '/#!/recipes/' + recipe.id;
		});
	}
 });