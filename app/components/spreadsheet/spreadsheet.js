/**
 * Created by Rodion on 08.12.2014.
 */
'use strict';

angular
    .module('Spreadsheet', ['ngHandsontable'])
    .directive('sshTable', [function () {
        return {
            templateUrl: function (elem, attr) {
                return 'components/spreadsheet/spreadsheet.html'
            },
            compile: function (element, attrs) {
                return function ($scope, element, attrs) {
                    $scope.items = [
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
                    ];
                }
            }
        };
    }]);
