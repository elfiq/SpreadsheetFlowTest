/**
 * Created by Rodion on 08.12.2014.
 */
'use strict';

angular
    .module('Spreadsheet', ['ngHandsontable'])
    .directive('sshTable', [function () {
        var colLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        var getColTitle = function (colIndex) {
            var letters = colLetters[colIndex%colLetters.length];
            if (colIndex>=colLetters.length) {
                colIndex = Math.floor(colIndex/colLetters.length-1);
                letters = getColTitle(colIndex)+letters;
            }
            return letters;
        };

        return {
            templateUrl: function (elem, attr) {
                return 'components/spreadsheet/spreadsheet.html'
            },
            controller:function($scope,$timeout) {
                $scope.items = [];
                $scope.columns = [];
                $scope.colHeaders = function (index) {
                    return getColTitle(index);
                };
                $scope.rowHeaders = function (index) {
                    return index;
                };
                var ResultRenderer = function (instance, td, row, col, prop, value, cellProperties) {
                    arguments[5] = $scope.data.results[row][col];
                    return Handsontable.renderers.TextRenderer.apply(this, arguments);
                };
                $scope.cells = function(row, col, prop) {
                    var cellProperties = {}
                    cellProperties.renderer = ResultRenderer;
                    return cellProperties;
                };
                $scope.colResize = function(col, size) {
                    if (!$.isArray($scope.data.columnWidths)) {
                        $scope.data.columnWidths = [];
                    }
                    $scope.data.columnWidths[col] = size;
                }
                $scope.$parent.$parent.$watch('currentNode', function(value) {
                    if (!value) {
                        $scope.items = [];
                        $scope.data = {};
                        return;
                    }
                    $scope.data = {};
                    $scope.items = [];
                    $timeout(function() {
                        $scope.data = value.data;
                        $scope.items = value.data.formulas;
                    },0);
                });
            },
            link: function(scope, element) {
                scope.items = [];
                scope.data = {};
            },
            compile: function (element, attrs) {
                return function ($scope, element, attrs) {

                    /*
                        {
                            "id":1,
                            "name":{
                                "first":"John",
                                "last":"Schmidt"
                            },
                            "address":"45024 France",
                            "price":760.41,
                            "isActive":"Yes",
                            "product":{
                                "description":"Fried Potatoes",
                                "options":[
                                    {
                                        "description":"Fried Potatoes",
                                        "image":"//a248.e.akamai.net/assets.github.com/images/icons/emoji/fries.png",
                                        "Pick$":null
                                    },
                                    {
                                        "description":"Fried Onions",
                                        "image":"//a248.e.akamai.net/assets.github.com/images/icons/emoji/fries.png",
                                        "Pick$":null
                                    }
                                ]
                            }
                        },
                        //more items go here
                    ];*/
                }
            }
        };
    }]);
