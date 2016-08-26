'use strict';

angular.module('jerutoApp')
  .controller('HeaderCtrl', function ($scope, $location, Authentication) {

  	$scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };

   	$scope.logoutUser = function() {
  		Authentication.logoutUser($scope.user);
  	};

});
