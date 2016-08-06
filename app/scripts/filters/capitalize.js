'use strict';

/**
 * @ngdoc filter
 * @name jerutoApp.filter:capitalize
 * @function
 * @description
 * # capitalize
 * Filter in the jerutoApp.
 */
 angular.module('jerutoApp')
 .filter('capitalize', function() {
 	return function(input) {
 		return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
 	}
 });;
