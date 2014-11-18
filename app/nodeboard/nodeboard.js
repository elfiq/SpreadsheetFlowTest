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
function clearNodes() {
    $("#view").scope().$apply(function (scope) {
        links.length = 0;
        nodes.length = 0;
    });
}
function fillRandomData() {
    addRandomNode(true);
    addRandomNode(true);
    addRandomNode(true);
    addRandomLink(true);
    addRandomLink(true);
    addRandomLink(true);
}
angular.module('SpreadsheedFlow.Nodeboard', ['ngAnimate'])
   
    .directive('sfNodeboard', function () {
        return {
            templateUrl: function(elem, attr) {
                return 'nodeboard/nodeboard.html'
            },
            compile:function(element, attrs) {
                return function ($scope, element, attrs) {
                    fillRandomData();
                    $scope.scale = 1;
                    $scope.nodes = nodes;
                    $scope.links = links;
                    $scope.position = {x:0,y:0};

                    var $board = $(".board",element);
                    $board.bind('mousewheel', function(event) {
                       if (event.originalEvent.wheelDelta>0) {
                           $scope.zoomIn(1+0.05*event.originalEvent.wheelDelta/120);
                           $scope.$apply();
                       } else {
                           $scope.zoomOut(1+0.05*(-event.originalEvent.wheelDelta)/120);
                           $scope.$apply();
                       }
                    });
                    var leftTopPoint = {x:$board.offset().left, y: $board.offset().top};

                    $scope.addLink = function (link) {
                        $scope.links.push(link);
                    }
                    $scope.removeLink = function (linkId) {
                        //$scope.links
                    }
                    $scope.zoomIn = function (val) {
                        if (val==undefined) val = 1.1;
                        $scope.scale = $scope.scale * val;
                    }
                    $scope.zoomOut = function (val) {
                        if (val==undefined) val = 1.1;
                        $scope.scale = $scope.scale / val;
                    }
                    // svgRoot =
                    $scope.convertPointClientToBoard = function (clientX,clientY) {
                        return {
                            x:(clientX-leftTopPoint.x-$scope.position.x)/$scope.scale,
                            y:(clientY-leftTopPoint.y-$scope.position.y)/$scope.scale
                        };
                    }
                    $scope.convertDistanceClientToBoard = function (clientWidth, clientHeight) {
                        return {
                            x:(clientWidth)/$scope.scale,
                            y:(clientHeight)/$scope.scale
                        };
                    }

                    var startDragPoint = {x:0,y:0};
                    interact($board[0])
                        .draggable({
                            onmove : function (event) {
                                $scope.position.x = $scope.position.x+event.dx;
                                $scope.position.y = $scope.position.y+event.dy;
                                $scope.$apply();
                            }
                        })
                        .inertia({
                            esistance     : 100
                        });
                }
            }
        }
    });