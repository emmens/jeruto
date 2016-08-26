'use strict';

/**
 * @ngdoc overview
 * @name jerutoApp
 * @description
 * # jerutoApp
 *
 * Main module of the application.
 */
 var jerutoApp = angular
 .module('jerutoApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'firebase'
  ]).constant('FIREBASE_URL', 'https://angreg-cc54a.firebaseio.com/')

jerutoApp.run(['$rootScope', '$location', function($rootScope, $location) {
  $rootScope.$on ('$routeChangeError', function(event, next, previous, error){
    if (error=='AUTH_REQUIRED') {
      $rootScope.message = 'Sorry, you must log in to access that page';
      $location.path('/login');
    }
  })
}]);
      


jerutoApp.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider
  .when('/', {
    templateUrl: 'views/recipe-list.html',
    controller: 'RecipeListCtrl',
    controllerAs: 'recipe-list',
    resolve: {
      currentAuth: function(Authentication){
        return Authentication.requireAuth();
      } //current Auth
    } //resolve
  })
  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'login'
  })
  .when('/register', {
    templateUrl: 'views/register.html',
    controller: 'RegisterCtrl',
    controllerAs: 'register'
  })
  .when('/recipes/:recipeId', {
    templateUrl: 'views/recipe-detail.html',
    controller: 'RecipeDetailCtrl',
    controllerAs: 'recipe-detail',
    resolve: {
      currentAuth: function(Authentication){
        return Authentication.requireAuth();
      } //current Auth
    } //resolve
  })
  .otherwise({
    redirectTo: '/'
  });
});