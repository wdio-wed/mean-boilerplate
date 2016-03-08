angular.module('FruitApp.TableController', []);
angular.module('FruitApp.TableController')
.controller('TableController', ['$scope', 'fruitFactory', function ($scope, fruitFactory) {
    //Update fruits
    $scope.$parent.update_fruits = function(){
        $scope.$parent.loading = true;
        //Load fruits
        fruitFactory.readFruits(function(response) {
            //$('tbody').html('');
            $scope.$parent.fruit_list = response.data;
            console.log($scope.fruit_list);
            $scope.$parent.loading = false;

            $scope.fruitClick =  function(id) {
                $scope.$parent.loading = true;
                $scope.$parent.editing = true;
                fruitFactory.readFruit(id,
                    function(response) {
                        console.log(response.data);
                        $scope.$parent.fruit = response.data;
                        $scope.$parent.loading = false;

                        //Floating label layout fix
                        $('.mdl-textfield').addClass('is-focused');
                    }, function(response) {
                        //error
                        console.error(response);
                });
            };
        }, function(response) {
            //error
            console.error(response);
        });


    };
}]);
