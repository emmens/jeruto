'use strict';

 angular.module('jerutoApp')
 .controller('RecipeListCtrl', function (Recipe, $timeout, $scope, $window) {

 	$scope.recipes = Recipe.query();
 	$scope.orderProp = 'name';
 	$scope.recipe =  new Recipe();
 	$scope.recipe.ingredients = [];  


    $scope.list = [];
    $scope.text = '';
    $scope.submit = function() {
    if ($scope.text) {
        $scope.list.push($scope.text);
        $scope.text = '';
    } 
    };

    $scope.undoIngredient = function(entry) {''
        var index = $scope.list.indexOf(entry);
        if (index > -1) {
            $scope.list.splice(index, 1);
        }
    }
 	
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

    $scope.goBack = function() {
        closeIngredientForm()
        openNewForm();
    }
 });