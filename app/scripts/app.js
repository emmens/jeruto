'use strict';

/**
 * @ngdoc overview
 * @name jerutoApp
 * @description
 * # jerutoApp
 *
 * Main module of the application.
 */
angular
  .module('jerutoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider
      .when('/', {
        templateUrl: 'views/recipe-list.html',
        controller: 'RecipeListCtrl',
        controllerAs: 'recipe-list'
      })
      .when('/recipes/:recipeId', {
        templateUrl: 'views/recipe-detail.html',
        controller: 'RecipeDetailCtrl',
        controllerAs: 'recipe-detail'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
