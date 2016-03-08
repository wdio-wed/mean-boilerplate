angular.module('FruitApp.FruitService', []);
angular.module('FruitApp.FruitService')
.factory('fruitFactory', ['$http', function ($http) {
    var factory = {};

    factory.readFruits = function(success, error) {
        $http({
            url: '/api/0.1/fruit',
            method: "GET"
        }).then(success, error);
    };

    factory.readFruit = function(id, success, error) {
        $http({
            url: '/api/0.1/fruit/'+id,
            method: "GET"
        }).then(success, error);
    };

    factory.createFruit = function(data, success, error){
        $http({
            url: '/api/0.1/fruit/',
            method: "POST",
            data: data
        }).then(success, error);
    };

    factory.updateFuit = function(id, data, success, error){
        $http({
            url: '/api/0.1/fruit/'+id,
            method: "PUT",
            data: data
        }).then(success, error);
    };

    factory.deleteFruit =  function(id, success, error){
        $http({
            url: '/api/0.1/fruit/'+id,
            method: "DELETE"
        }).then(success, error);
    };

    return factory;
}]);
