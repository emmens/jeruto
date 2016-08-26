'use strict';

 angular.module('jerutoApp')
 .controller('RecipeDetailCtrl', function (Recipe, $scope, $routeParams, $window) {

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
      if ($scope.updateRecipe.ingredients.indexOf(item) == -1) { $scope.updateRecipe.ingredients.push(item)}
    })
  }

  $scope.recipe = Recipe.get({recipeId: $routeParams.recipeId}, function(){
  });

  $scope.deleteRecipe = function(recipe) {
   Recipe.remove({recipeId: recipe.id}, function(){
    $window.location.href = '/';
  });
 }

 $scope.updateGetRecipe = function() {
   $scope.updateRecipe = Recipe.get({recipeId: $routeParams.recipeId});
 }
 $scope.update = function(recipe) {
   Recipe.update({recipeId: $scope.updateRecipe.id}, recipe, function(){
    $scope.recipe = Recipe.get({recipeId: $routeParams.recipeId}, function(){
    });
  })
 }

 $scope.goBack = function() {
   window.history.back();
 }

});
