'use strict';

/**
 * @ngdoc service
 * @name jerutoApp.recipe
 * @description
 * # recipe
 * Factory in the jerutoApp.
 */

 angular.module('jerutoApp')
 .factory('Recipe', function ($resource) {
    return $resource('http://57a4b3c3d5b43e110058a4f9.mockapi.io/recipes/:recipeId', {}, {
        'update': { method:'PUT' },
        'remove': { method: 'DELETE'}
    })
});





