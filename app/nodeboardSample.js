angular.module('NodeboardSample', [
  'Nodeboard',
  'ui.bootstrap',
  'ngAnimate'
])
    .controller('nbController',['$scope',function($scope) {
        $scope.src="sdsda";
        $scope.currentNode = undefined;
        console.log($scope);
        $scope.$watch("currentNode", function(value) {
            //$scope.spreadsheet.data = value.data;
        });
    }]);
