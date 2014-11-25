/**
 * Created by rodion on 22.11.14.
 */
'use strict';
angular.module('Nodeboard')
    .directive("nbOutgoingSlot", ['$timeout', function ($timeout) {
        return {
            compile: function (element, attrs) {
                return function (scope, element, attrs) {
                    var $el = $(element);

                    var startPos = {x:0,y:0};
                    var unlinkDistance = 20;
                    var $newLinkSlotScope = $("#slot_new").scope();
                    var $newLink = $("#link_new");
                    interact($el[0])
                        .draggable({
                            onstart:function () {
                                scope.$parent.$parent.$parent.addLinkState = 1;
                                scope.$parent.$parent.$parent.$apply();
                                $newLinkSlotScope = $("#slot_new").scope();
                                $newLink = $("#link_new");
                                startPos.x = scope.$parent.$parent.node.x+scope.position.x;
                                startPos.y = scope.$parent.$parent.node.y+scope.position.y;
                            },
                            onmove:function (event) {
                                var distance = scope.$parent.convertDistanceClientToBoard(event.clientX - event.clientX0,event.clientY - event.clientY0);
                                $newLinkSlotScope.newSlotPosition.x = startPos.x + distance.x;
                                $newLinkSlotScope.newSlotPosition.y = startPos.y + distance.y;
                                $newLinkSlotScope.$apply();
                                var start = startPos;
                                var end = $newLinkSlotScope.newSlotPosition;

                                $newLink.attr('d',"M "+start.x+" "+start.y+" Q "+(start.x)+" "+(start.y+10)+" "+(start.x+end.x)/2+" "+(start.y+end.y)/2+" Q "+end.x+" "+(end.y-10)+" "+end.x+" "+end.y);

                            },
                            onend: function (event) {
                                scope.$parent.$parent.$parent.addLinkState = 0;
                                scope.$parent.$parent.$parent.$apply();
                            }
                        });


                }
            }
        }
    }]);