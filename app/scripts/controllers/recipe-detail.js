'use strict';

/**
 * @ngdoc function
 * @name jerutoApp.controller:RecipeDetailCtrl
 * @description
 * # RecipeDetailCtrl
 * Controller of the jerutoApp
 */
 angular.module('jerutoApp')
 .controller('RecipeDetailCtrl', function (Recipe, $scope, $routeParams, $window) {

 	$scope.recipe = Recipe.get({recipeId: $routeParams.recipeId}, function(){
 	});

 	$scope.deleteRecipe = function(recipe) {
 		Recipe.$delete({recipeId: recipe.id}, function(){
			$window.location.href = '/';
 		});
 	}

 	$scope.showUpdateForm = false;
 	$scope.updateGetRecipe = function(recipe) {
 		$scope.updateRecipe = Recipe.get({recipeId: recipe.id});
 	}
 	$scope.updateRecipe = function(recipe) {
 		updateRecipe.$save(function(response) {
            $scope.recipe = Recipe.get({recipeId: $routeParams.recipeId});
        });
 	}

 	$scope.goBack = function() {
 		window.history.back();
 	}

 });
