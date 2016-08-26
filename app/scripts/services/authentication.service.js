'use strict';

angular.module('jerutoApp')
.factory("Authentication", ["$rootScope", "$firebaseAuth", "$firebaseObject",
 "$location",
  function($rootScope, $firebaseAuth, $firebaseObject, $location) {

    var auth = $firebaseAuth();

    auth.$onAuthStateChanged(function(authUser){
      if (authUser) {
        var userRef = firebase.database().ref('users/' + authUser.uid);
        var userObj = $firebaseObject(userRef);
        $rootScope.currentUser = userObj;
      } else {
        $rootScope.currentUser = '';
      }
    });

    var myObject = {

      loginUser: function(user) {
        auth.$signInWithEmailAndPassword(user.email, user.password)
        .then(function(regUser) {
          $location.path('/');
        })
        .catch(function(error) {
          $rootScope.message = error.message;
        });
      }, //login

      logoutUser: function(user) {
        auth.$signOut()
      }, //logout

      requireAuth: function() {
        return auth.$requireSignIn();
      }, //require authentication

      loginUserFacebook: function(user) {
        auth.$signInWithPopup("facebook").then(function(result) {
          console.log("Signed in as:", result.user.uid);
        }).catch(function(error) {
          $rootScope.message = error.message;
        });
      },

      createUser: function(user) {
        auth.$createUserWithEmailAndPassword(user.email, user.password)
        .then(function(regUser) {

          var regRef = firebase.database().ref('users')
          .child(regUser.uid).set({
            date: firebase.database.ServerValue.TIMESTAMP,
            regUser: regUser.uid,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
          }); //user info

          myObject.loginUser(user);

        }).catch(function(error) {
          $rootScope.message = error.message;
        });
      } //register 
    } //myObject
    return myObject;
  }
]);
