'use strict';

angular.module('jerutoApp')
  .controller('LoginCtrl', function ($scope, Authentication) {

  	$scope.loginUser = function() {
  		Authentication.loginUser($scope.user);
  	};

  	$scope.loginUserFacebook = function() {
  		Authentication.loginUserFacebook($scope.user);
  	};

  	$scope.getFacebookUserInfo = function() {
  		Authentication.getFacebookUserInfo();
  	};

  }); 
