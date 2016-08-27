'use strict';

angular.module('jerutoApp')
  .controller('RegisterCtrl', function ($scope, Authentication) {

  	$scope.createUser = function() {
  		Authentication.createUser($scope.user);
  	};

  	$scope.login = function() {
  		Authentication.login($scope.user);
  	};

   	$scope.logout = function() {
  		Authentication.logout($scope.user);
  	};

  }); 
