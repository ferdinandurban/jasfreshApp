// 'use strict';
 
angular.module('myApp.home', ['ngRoute', 'firebase'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    });
}])
 
// Home controller
.controller('HomeCtrl',['$scope', '$location', 'CommonProp', '$firebaseAuth',
    function($scope, $location, CommonProp, $firebaseAuth) {
        var ref = new Firebase("https://jasfresh.firebaseio.com");
        var isLogged = false;

        ref.onAuth(function(authData) {
            if (authData) {
                console.log("Authenticated with uid:", authData.uid);
                CommonProp.setUser(authData.password.email);
                isLogged = true;        
            } else {
                console.log("Client unauthenticated.")
                isLogged = false;
            }
        });

        if (isLogged) $location("/welcome");

        $scope.user = {};
        $scope.SignIn = function(e) {
            e.preventDefault();

            ref.authWithPassword({
              "email": $scope.user.email,
              "password": $scope.user.password
            }, function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                    CommonProp.setUser(authData.password.email);
                    $location.path('/welcome');
                }
            });
        }
    }
])

.service('CommonProp',['$location','$firebaseAuth',function($location,$firebaseAuth) {
        var user = '';
        var ref = new Firebase ("https://jasfresh.firebaseio.com");
        var auth = $firebaseAuth(ref);
        
        return {
            getUser: function() {
                return user;
            },
            setUser: function(value) {
                user = value;
            },
            logoutUser: function(){
                ref.unauth();
                user='';
                localStorage.removeItem('userEmail');
                $location.path('/home');
            }
    };
}]);