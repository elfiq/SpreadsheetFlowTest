/**
 * Created by rodion on 22.10.14.
 */
'use strict';
var nodes = [];
var links = [];
var randNodeId = 0;
var randSlotId = 0;
var randLinkId = 0;
function addRandomNode(instant) {
    randNodeId ++;
    var node = {
        id:randNodeId,
        title:'Node Number #'+randNodeId,
        x:Math.round(Math.random()*$(".nodeboard").width()),
        y:Math.round(Math.random()*$(".nodeboard").height()),
        className:"style"+Math.round(Math.random()*5),
        ingoingSlots:[],
        outgoingSlots:[]
    }
    var inSlotsCount = Math.round(Math.random()*3)+1;
    for (var i=0;i<inSlotsCount;i++) {
        randSlotId++;
        node.ingoingSlots.push({
            id:randSlotId,
            title:'slot'+randSlotId
        });
    }
    randSlotId++;
    node.outgoingSlots.push({
        id:randSlotId,
        title:'slot'+randSlotId
    });
    if (instant) {
        nodes.push(node);
    } else {
        $("#view").scope().$apply(function (scope) {
            nodes.push(node);
        });
    }
}
function addRandomLink(instant) {
    randLinkId++;
    var fromNodeInd = Math.floor(Math.random()*nodes.length);
    var toNodeInd = Math.floor(Math.random()*nodes.length);
    if (toNodeInd == fromNodeInd) return false;
    var toSlotInd = Math.floor(Math.random()*nodes[toNodeInd].ingoingSlots.length);
    if (_(links).findWhere({
        fromNodeId:nodes[fromNodeInd].id,
        toNodeId:nodes[toNodeInd].id,
        toSlotId:nodes[toNodeInd].ingoingSlots[toSlotInd].id
    })) return false;
    var link = {
        id:randLinkId,
        fromNodeId:nodes[fromNodeInd].id,
        fromSlotId:nodes[fromNodeInd].outgoingSlots[0].id,
        toNodeId:nodes[toNodeInd].id,
        toSlotId:nodes[toNodeInd].ingoingSlots[toSlotInd].id
    }
    if (instant) {
        links.push(link);
    } else {
        $("#view").scope().$apply(function (scope) {
            links.push(link);
        });
    }
}
function fillRandomData() {
    addRandomNode(true);
    addRandomNode(true);
    addRandomNode(true);
    addRandomLink(true);
    addRandomLink(true);
    addRandomLink(true);
}
angular.module('SpreadsheedFlow.Nodeboard', ['ngRoute','ngAnimate'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/nodeboard', {
            templateUrl: 'nodeboard/nodeboard.html',
            controller: 'NodeboardCtrl'
        });
    }])

    .controller('NodeboardCtrl', function($scope) {
        $scope.tmp = 'test';

        fillRandomData();
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