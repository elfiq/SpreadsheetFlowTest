/**
 * Created by rodion on 22.10.14.
 */
'use strict';
var nodes = [
    {
        id:112,
        title:"Node short name",
        x:100,
        y:40,
        className:"style1",
        ingoingSlots:[
            {
                id:1,
                title:'slot1'
            },
            {
                id:2,
                title:'slot2'
            }
        ],
        outgoingSlots:[
            {
                id:3,
                title:'slot3'
            }
        ]
    },
    {
        id:113,
        title:"Node name",
        x:110,
        y:120,
        className:"style2",
        ingoingSlots:[
            {
                id:4,
                title:'slot4'
            },
            {
                id:5,
                title:'slot5'
            }
        ],
        outgoingSlots:[
            {
                id:6,
                title:'slot6'
            }
        ]
    }
];
var links = [
    {
        id:1,
        fromNodeId:112,
        toNodeId:113,
        fromSlotId:3,
        toSlotId:4
    }
];
var newlink = {id:2,fromNodeId:112,toNodeId:113,fromSlotId:3,toSlotId:5};
var newNode = {
        id:114,
        title:"NewNodeN ame",
        x:310,
        y:120,
        className:"style1",
        ingoingSlots:[
            {
                id:7,
                title:'slot4'
            },
            {
                id:8,
                title:'slot5'
            }
        ],
        outgoingSlots:[
            {
                id:9,
                title:'slot6'
            }
        ]
    };
angular.module('SpreadsheedFlow.Nodeboard', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/nodeboard', {
            templateUrl: 'nodeboard/nodeboard.html',
            controller: 'NodeboardCtrl'
        });
    }])

    .controller('NodeboardCtrl', function($scope) {
        $scope.tmp = 'test';

        $scope.scale = 1;
        $scope.nodes = nodes;
        $scope.links = links;
        $scope.addLink = function (link) {
            $scope.links.push(link);
        }
        $scope.removeLink = function (linkId) {
            //$scope.links
        }
        $scope.zoomIn = function () {
            $scope.scale = $scope.scale * 1.1;
        }
        $scope.zoomOut = function () {
            $scope.scale = $scope.scale / 1.1;
        }
        // svgRoot =
        $scope.translateFromPosition = function (x,y) {
            return {x:x/$scope.scale,y:y/$scope.scale};
        }

    });