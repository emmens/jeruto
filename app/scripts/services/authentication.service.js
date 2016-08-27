'use strict';

angular.module('jerutoApp')
.factory("Authentication", ["$rootScope", "$firebaseAuth", "$firebaseObject",
 "$location",
 function($rootScope, $firebaseAuth, $firebaseObject, $location) {

  var auth = $firebaseAuth();


  auth.$onAuthStateChanged(function(authUser){
    if (authUser) {
      console.log(authUser.providerData[0].uid);
      var userRef = firebase.database().ref('users/' + authUser.providerData[0].uid);
      var userObj = $firebaseObject(userRef);
      $rootScope.currentUser = userObj;
    } else {
      $rootScope.currentUser = '';
    }
  });

  var myObject = {

// ---- Email/Password Sign IN ---- 

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
      }, //register 

// ---- Facebok Sign In ---- 

      // This is called with the results from from FB.getLoginStatus().
      statusChangeCallback: function(response) {
        console.log('statusChangeCallback');
        console.log(response.status);
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
        if (response.status === 'connected') {
          // Logged into your app and Facebook.
          myObject.testAPI();
        } else if (response.status === 'not_authorized') {
          // The person is logged into Facebook, but not your app.
          $rootScope.message = 'Please log ' +
          'into this app.'
        } else {
          // The person is not logged into Facebook, so we're not sure if
          // they are logged into this app or not.
          $rootScope.message = 'Please log ' +
          'into Facebook.';
        }
      }, //statusChangeCallBack

      isUserEqual: function(facebookAuthResponse, firebaseUser) {
        if (firebaseUser) {
          var providerData = firebaseUser.providerData;
          for (var i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === firebase.auth.FacebookAuthProvider.PROVIDER_ID &&
              providerData[i].uid === facebookAuthResponse.userID) {
              // We don't need to re-auth the Firebase connection.
            return true;
          }
        }
      }
      return false;
      }, // isUserEqual      


      testAPI: function() {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function(response) {
          console.log('Successful login for: ' + response.name);
          $rootScope.message = 'Thanks for logging in, ' + response.name + '!';
        });
      }, //testAPI

      checkLoginState: function(event) {
        myObject.addUserToDatabase();
        if (event.authResponse) {
          // User is signed-in Facebook.
          var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!myObject.isUserEqual(event.authResponse, firebaseUser)) {
              // Build Firebase credential with the Facebook auth token.
              var credential = firebase.auth.FacebookAuthProvider.credential(
                event.authResponse.accessToken);
              // Sign in with the credential from the Facebook user.
              firebase.auth().signInWithCredential(credential).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
              });
            } else {
              // User is already signed-in Firebase with the correct user.
            }
          });
        } else {
          // User is signed-out of Facebook.
          firebase.auth().signOut();
        }
      }, //checkLoginState 

      addUserToDatabase:  function() {
          FB.api('/me', 'get', { fields: 'id,first_name,last_name,email'}, function(response) {
              var regRef = firebase.database().ref('users').child(response.id);
              regRef.once("value").then(function(snapshot) {
                var exists = snapshot.exists() // is user already in database 
              
                if (!exists) {
                  regRef.set({
                    date: firebase.database.ServerValue.TIMESTAMP,
                    regUser: response.id,
                    firstname: response.first_name,
                    lastname: response.last_name,
                    email: response.email
                  }); //user info 
                } 
            });
          });
        } //addUserToDatabaseS
    } //myObject
    return myObject;
  }
  ]);
