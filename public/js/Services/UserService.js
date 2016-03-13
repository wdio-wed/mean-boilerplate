angular.module('FruitApp.UserService', []);
angular.module('FruitApp.UserService')
.factory('userFactory', ['$http', function ($http) {
    var factory = {};

    factory.login = function(data, success, error){
        $http({
            url: '/api/0.1/user/login',
            method: "POST",
            data: data
        }).then(success, error);
    };

    return factory;
}]);
