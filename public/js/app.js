var app = angular.module('FruitApp', ['ngRoute', 'ngResource', 'FruitApp.FruitService', 'FruitApp.UserService', 'FruitApp.LoginController', 'FruitApp.TableController', 'FruitApp.CardController'])
.controller('MainController',  ['$scope', '$http', function ($scope, $http) {
    //State vars initialization
    $scope.loading = true;
    $scope.loggedIn = getCookie('username') != "";
    $scope.fruit={};
    $scope.editing = false;

    //Add fruit button handler
    $scope.add_fruit = function(){
        $scope.fruit={};
        $scope.editing = true;

        //Floating label layout fix
        $('.mdl-textfield').removeClass('is-focused');
    };

    //Logout button handler
    $scope.logout = function(e){
        delete_cookie('username');
        location.reload();
    };
}]);
