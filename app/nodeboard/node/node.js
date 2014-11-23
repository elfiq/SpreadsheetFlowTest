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
                    $el.bind({
                        'mousedown':function (event) {
                            $el.parent().append( $el );
                            if ($el[0].classList.contains('selected')) {
                                return;
                            }
                            if (!event.shiftKey && !event.ctrlKey) {
                                $(".node.selected",$el.parent()).each(function () {
                                    this.classList.remove('selected');
                                });
                            }
                            $el[0].classList.add('selected');
                            event.bubbles = false;// что б парент не схватил событие
                            event.originalEvent.cancelBubble = true;// что б парент не схватил событие
                        },
                        'click':function(event) {
                            event.bubbles = false;// что б парент не схватил событие
                            event.originalEvent.cancelBubble = true;// что б парент не схватил событие
                        }
                    });
                    interact($el[0])
                        .draggable({
                            onstart: function (event) {
                                startDragPoint = {x:scope.node.x,y:scope.node.y};
                            },
                            onmove : function (event) {
                                var translatedPoint = scope.$parent.convertDistanceClientToBoard(event.dx,event.dy);
                                $(".node.selected",$el.parent()).each(function () {
                                    var scope = $(this).scope();
                                    scope.node.x = scope.node.x + translatedPoint.x;
                                    scope.node.y = scope.node.y + translatedPoint.y;
                                });
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
                            }
                            var outgoingSlots = $el.find(".outgoing");
                            cnt = outgoingSlots.length;
                            for (i=0;i<cnt;i++) {
                                outgoingSlots.eq(i).scope().position = {x:(i*25-(cnt-1)/2*25), y:h/2+7};
                                outgoingSlots.eq(i).scope().$apply();
                            }
                            $timeout(function () { scope.$parent.$broadcast("nodePositionChange:"+scope.node.id); },0);
                        },100);
                    }, true);
                }
                return linkFunction;
            }
        };
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