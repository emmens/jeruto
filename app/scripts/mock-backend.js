// // We will be using backend-less development
// // $http uses $httpBackend to make its calls to the server
// // $resource uses $http, so it uses $httpBackend too
// // We will mock $httpBackend, capturing routes and returning data
// angular.module('jerutoApp').run(function($httpBackend, ServerDataModel) {
    
//     $httpBackend.whenGET('/games').respond(function(method, url, data) {
//         var games = ServerDataModel.findAll();
//         return [200, games, {}];
//     });
    
//     $httpBackend.whenGET(/\/games\/\d+/).respond(function(method, url, data) {
//         // parse the matching URL to pull out the id (/games/:id)
//         var gameid = url.split('/')[2];
        
//         var game = ServerDataModel.findOne(gameid);

//         return [200, game, {}];
//     });

//     // this is the creation of a new resource
//     $httpBackend.whenPOST('/games').respond(function(method, url, data) {
//         var params = angular.fromJson(data);

//         var game = ServerDataModel.addOne(params);
        
//         // get the id of the new resource to populate the Location field
//         var gameid = game.gameid;
        
//         return [201, game, { Location: '/games/' + gameid }];
//     });

//     // this is the update of an existing resource (ngResource does not send PUT for update)
//     $httpBackend.whenPOST(/\/games\/\d+/).respond(function(method, url, data) {
//         var params = angular.fromJson(data);

//         // parse the matching URL to pull out the id (/games/:id)
//         var gameid = url.split('/')[2];
        
//         var game = ServerDataModel.updateOne(gameid, params);
        
//         return [201, game, { Location: '/games/' + gameid }];
//     });
    
//     // this is the update of an existing resource (ngResource does not send PUT for update)
//     $httpBackend.whenDELETE(/\/games\/\d+/).respond(function(method, url, data) {
//         // parse the matching URL to pull out the id (/games/:id)
//         var gameid = url.split('/')[2];
        
//         ServerDataModel.deleteOne(gameid);
        
//         return [204, {}, {}];
//     });    
    
//     $httpBackend.whenGET(/templates\//).passThrough();
    
// });