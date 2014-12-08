/**
 * Created by rodion on 22.10.14.
 */

angular.module('Nodeboard', ['ngAnimate'])
    .directive('nbBoard', ['nbData', function (nbData) {
        return {
            templateUrl: function(elem, attr) {
                return 'components/nodeboard/board/board.html'
            },
            compile:function(element, attrs) {
                return function ($scope, element, attrs) {
                    nbData.fillRandomData();
                    $scope.scale = 1;
                    $scope.position = {x:300,y:300};
                    $scope.newSlotPosition = {x:0,y:0};
                    $scope.nodes = nbData.getNodes();
                    $scope.links = nbData.getLinks();
                    $scope.watchers = nbData.getWatchers(); // свойства этого объекта меняются при изменении элементов
                    $scope.addLinkState = 0; // при добавлении связи - появляются доп. элементы

                    var $board = $(element),
                        $root = $(".nodeboard",element);
                        //leftTopPoint = {x:$board.offset().left, y: $board.offset().top};

                    var panZoom = svgPanZoom($root[0], {
                        panEnabled: false,
                        zoomEnabled: false,
                        dblClickZoomEnabled: false
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

                    $board.bind({
                        'mousewheel': function (evt) {
                            evt.preventDefault();
                            var zoomDelta = evt.deltaY / 300;
                            _zoom(zoomDelta, {x: evt.pageX - $board.offset().left, y: evt.pageY - $board.offset().top});
                            return false;
                        },
                        'click':function (evt) {
                            $(".node.selected",$board).each(function () {
                                this.classList.remove('selected');
                            });
                        }
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
                    $scope.removeSelection = function() {
                        $(".node.selected",$board).each(function () {
                            nbData.removeNodes($(this).scope().node);
                        });
                    }

                    $scope.convertPointClientToBoard = function (clientX,clientY) {
                        return {
                            x:(clientX-$board.offset().left-$scope.position.x)/$scope.scale,
                            y:(clientY-$board.offset().top-$scope.position.y)/$scope.scale
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
    }]);