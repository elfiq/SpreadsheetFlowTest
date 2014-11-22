/**
 * Created by rodion on 23.10.14.
 */
'use strict';
angular.module('SpreadsheedFlow.Nodeboard')
    .directive('sfNode',['$timeout','$animate',function ($timeout,$animate) {
        return {
            compile:function(element, attrs) {
                var linkFunction = function(scope, element, attrs) {
                    var $el = $(element);
                    var startDragPoint = {x:0,y:0};
                    interact($el[0])
                        .draggable({
                            onstart: function (event) {
                                $el.parent().append( $el );
                                startDragPoint = {x:scope.node.x,y:scope.node.y};
                            },
                            onmove : function (event) {
                                var translatedPoint = scope.$parent.convertDistanceClientToBoard(event.clientX - event.clientX0,event.clientY - event.clientY0);
                                scope.node.x = startDragPoint.x + translatedPoint.x;
                                scope.node.y = startDragPoint.y + translatedPoint.y;
                                scope.$apply();
                            },
                            onend  : function (event) {
                                //console.log('endDrag', event);
                            }
                        })
                        .inertia({
                            resistance : 20
                        });



                    scope.$watch("node", function (value) {
                        setTimeout(function () {
                            var title = $el.find(".title");
                            var rect = $el.find(".rect");
                            var w = title[0].getBBox().width;
                            var h = title[0].getBBox().height;
                            title.attr({x:-w/2,y:h/2-5});
                            rect.attr({x:-w/2-10,y:-h/2-7,width:w+20,height:h+14});
                            var ingoingSlots = $el.find(".ingoing");
                            var cnt = ingoingSlots.length;
                            var i;
                            for (i=0;i<cnt;i++) {
                                ingoingSlots.eq(i).scope().position = {x:(i*25-(cnt-1)/2*25), y:(-h/2-7)};
                                ingoingSlots.eq(i).scope().$apply();

                                //ingoingSlots.eq(i).attr('transform',"translate("+(i*25-(cnt-1)/2*25)+","+(-h/2-7)+")");
                            }
                            var outgoingSlots = $el.find(".outgoing");
                            cnt = outgoingSlots.length;
                            for (i=0;i<cnt;i++) {
                                outgoingSlots.eq(i).attr('transform',"translate("+(i*25-(cnt-1)/2*25)+","+(h/2+7)+")");
                            }
                            $timeout(function () { scope.$parent.$broadcast("nodePositionChange:"+scope.node.id); },0);
                        },100);
                    }, true);
                }
                return linkFunction;
            }
        };
    }])
    .directive("sfIngoingSlot", ['$timeout', function ($timeout) {
        console.log('ererer');
        return {
            compile: function (element, attrs) {
                console.log('erere');
                return function (scope, element, attrs) {
                    var $el = $(element);

                    var disconnect = function () {

                    }
                    var startPos = {x:0,y:0};
                    interact($el[0])
                        .draggable({
                            onstart:function () {
                                console.log('start');
                                startPos.x = scope.position.x;
                                startPos.y = scope.position.y;
                            },
                            onmove:function (event) {
                                console.log(event);
                                var distance = scope.$parent.convertDistanceClientToBoard(event.clientX - event.clientX0,event.clientY - event.clientY0);
                                scope.position.x = startPos.x + distance.x/3;
                                scope.position.y = startPos.y + distance.y/3;
                                scope.$apply();
                                if (Math.abs(scope.position.x - startPos.x) + Math.abs(scope.position.y - startPos.y)<10) {

                                }
                                if (event.duration>500) {
                                    event.interaction.stop(event);
                                    scope.position.x = startPos.x;
                                    scope.position.y = startPos.y;
                                    scope.$apply();
                                }
                            },
                            onend: function (event) {
                                if (Math.abs(scope.position.x - startPos.x) + Math.abs(scope.position.y - startPos.y)<10) {

                                }
                                scope.position.x = startPos.x;
                                scope.position.y = startPos.y;
                                scope.$apply();
                            }
                        })

                }
            }
        }
    }])
    .animation(".show-node", function () {
        return {
            enter: function (element, done) {
                element.css({
                    opacity:0
                }).animate({
                    opacity:1
                },500, done);
            },
            leave: function (element, done) {
                element.css({
                    opacity:1
                }).animate({
                    opacity:0
                },300, done);
            }
        }
    });