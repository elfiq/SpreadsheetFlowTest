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
                    $scope.position = {x:300,y:300};
                    $scope.nodes = nodes;
                    $scope.links = links;

                    var $board = $(element),
                        $root = $(".nodeboard",element),
                        leftTopPoint = {x:$board.offset().left, y: $board.offset().top};

                    var panZoom = svgPanZoom($root[0], {
                        panEnabled: false,
                        zoomEnabled: false
                    });

                    panZoom.setOnZoom(function (val) {
                        var pan = panZoom.getPan();
                        $scope.position.x = pan.x;
                        $scope.position.y = pan.y;
                        $scope.scale = panZoom.getZoom();
                        if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                            $scope.$apply();
                        }
                    });
                    panZoom.setOnPan(function (val) {
                        var pan = panZoom.getPan();
                        $scope.position.x = pan.x;
                        $scope.position.y = pan.y;
                        if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                            $scope.$apply();
                        }
                    });

                    $board.bind('mousewheel', function (evt) {
                        evt.preventDefault();
                        var zoomDelta = evt.deltaY/300;
                        _zoom(zoomDelta, {x:evt.pageX-leftTopPoint.x,y:evt.pageY-leftTopPoint.y});
                        return false;
                    });

                    function _zoom(zoomDelta, zoomTo) {
                        if (zoomTo == undefined) {
                            zoomTo = {x:$board.width()/2,y:$board.height()/2}
                        }
                        $scope.scale = 1+zoomDelta;
                        panZoom.zoomAtPointBy($scope.scale,zoomTo);
                    }



                    $scope.addLink = function (link) {
                        $scope.links.push(link);
                    }
                    $scope.removeLink = function (linkId) {
                        //$scope.links
                    }
                    var zoomScale = 1;



                    $scope.zoomIn = function (val, zoomTo) {
                        if (val==undefined) val = 0.1;
                        _zoom(val);
                    }
                    $scope.zoomOut = function (val, zoomTo) {
                        if (val==undefined) val = -0.1;
                        _zoom(val);
                    }
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
                            resistance : 20
                        });
                }
            }
        }
    });