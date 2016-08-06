'use strict';

/**
 * @ngdoc function
 * @name jerutoApp.controller:RecipeListCtrl
 * @description
 * # RecipeListCtrl
 * Controller of the jerutoApp
 */
 angular.module('jerutoApp')
 .controller('RecipeListCtrl', function (Recipe, $scope, $window) {

 	$scope.recipes = Recipe.query();
 	$scope.orderProp = 'name';
 	$scope.showNewForm = false;

 	$scope.deleteGetResource = function(recipeId) {
        $scope.deleteGame = Recipe.get({recipeId: recipeId});
    };

 	$scope.saveRecipe = function() {
 		Recipe.save($scope.recipe, function(recipe) {
			$window.location.href = '/#!/recipes/' + recipe.id;
		});
	}
 });