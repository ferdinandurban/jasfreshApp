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
.controller('HomeCtrl', [function($scope, $location, CommonProp, $firebaseAuth) {
    var firebaseObj = new Firebase("https://jasfresh.firebaseio.com");
    var loginObj = $firebaseAuth(firebaseObj);
    
    $scope.user = {};
    $scope.SignIn = function(e) {
        e.preventDefault();
        var username = $scope.user.email;
        var password = $scope.user.password;
     
        loginObj.$authWithPassword({
                email: username,
                password: password
            })
            .then(function(user) {
                //Success callback
                console.log('Authentication successful');
                CommonProp.setUser(user.password.email);
                $location.path('/welcome');

            }, function(error) {
                //Failure callback
                console.log('Authentication failure');
            });
    }
}])

.service('CommonProp', function() {
    var user = '';
 
    return {
        getUser: function() {
            return user;
        },
        setUser: function(value) {
            user = value;
        }
    };
});