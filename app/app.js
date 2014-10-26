'use strict';

// Declare app level module which depends on views, and components
angular.module('SpreadsheedFlow', [
  'ngRoute',
  'SpreadsheedFlow.view1',
  'SpreadsheedFlow.view2',
  'SpreadsheedFlow.Nodeboard',
  'SpreadsheedFlow.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/nodeboard'});
}]);
