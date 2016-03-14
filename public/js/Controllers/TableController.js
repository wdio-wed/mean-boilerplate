angular.module('FruitApp.TableController', [])
.controller('TableController', ['$scope', 'fruitFactory', function ($scope, fruitFactory) {
    //Update fruits
    $scope.$parent.update_fruits = function(){
        $scope.$parent.loading = true;
        //Load fruits
        fruitFactory.query().$promise.then(function(response) {
            //$('tbody').html('');
            $scope.$parent.fruit_list = response;
            $scope.$parent.loading = false;

            $scope.fruitClick =  function(id) {
                $scope.$parent.loading = true;
                $scope.$parent.editing = true;
                fruitFactory.get({id: id},
                    function(response) {
                        console.log(response);
                        $scope.$parent.fruit = response;
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
