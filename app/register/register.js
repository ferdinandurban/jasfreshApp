// 'use strict';
 
angular.module('myApp.register', ['ngRoute', 'firebase'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/register', {
        templateUrl: 'register/register.html',
        controller: 'RegisterCtrl'
    });
}])
 
// Register controller
.controller('RegisterCtrl', ['$scope', '$location', function($scope, $location, $firebaseAuth) {
    var ref = new Firebase("https://jasfresh.firebaseio.com");
    
    $scope.SignUp = function(e) {
        if (!$scope.regForm.$invalid) {
            var email = $scope.user.email;
            var password = $scope.user.password;
         
            ref.createUser({email:email, password:password},
                function(error, userData) {
                    if(error) {
                        console.log(error);
                        $scope.regError = true;
                        $scope.regErrorMessage = error.message;
                    } else {    // do things if success
                        console.log('User creation success');
                        $location.path('/home');
                    }
                });
        }
    };
}]);