/**
 * Created by rodion on 22.11.14.
 */
'use strict';
angular.module('SpreadsheedFlow.Nodeboard')
    .directive("sfIngoingSlot", ['$timeout','sfData', function ($timeout,sfData) {
        return {
            compile: function (element, attrs) {
                return function (scope, element, attrs) {
                    var $el = $(element);
                    var disconnect = function () {
                        var links = sfData.getLinksWhere({toSlotId:scope.slot.id});
                        sfData.removeLinks(links);
                    }
                    var startPos = {x:0,y:0};
                    var unlinkDistance = 20;
                    interact($el[0])
                        .draggable({
                            onstart:function () {

                                startPos.x = scope.position.x;
                                startPos.y = scope.position.y;
                            },
                            onmove:function (event) {
                                var distance = scope.$parent.convertDistanceClientToBoard(event.clientX - event.clientX0,event.clientY - event.clientY0);

                                scope.position.x = startPos.x + distance.x/3;
                                scope.position.y = startPos.y + distance.y/3;
                                $timeout(function () { scope.$parent.$parent.$parent.$broadcast("slotPositionChange:"+scope.slot.id); },0);
                                scope.$apply();
                                if (Math.abs(scope.position.x - startPos.x) + Math.abs(scope.position.y - startPos.y)>unlinkDistance) {
                                    if (event.duration>300) {
                                        event.interaction.stop(event);
                                        scope.position.x = startPos.x;
                                        scope.position.y = startPos.y;
                                        $timeout(function () { scope.$parent.$parent.$parent.$broadcast("slotPositionChange:"+scope.slot.id); },0);
                                        scope.$apply();
                                        disconnect();
                                    }
                                }
                            },
                            onend: function (event) {
                                scope.position.x = startPos.x;
                                scope.position.y = startPos.y;
                                $timeout(function () { scope.$parent.$parent.$parent.$broadcast("slotPositionChange:"+scope.slot.id); },0);
                                scope.$apply();
                                if (Math.abs(scope.position.x - startPos.x) + Math.abs(scope.position.y - startPos.y)>unlinkDistance) {
                                    disconnect();
                                }
                            }
                        })
                        .dropzone({
                            accept:".outgoing",
                            ondragenter:function (event){
                                $el[0].classList.add("dragEnter");
                            },
                            ondragleave:function(event) {
                                $el[0].classList.remove("dragEnter");
                            },
                            ondrop:function(event) {
                                $el[0].classList.remove("dragEnter");
                                var fromSlot = $(event.relatedTarget).scope().slot;
                                var fromNode = $(event.relatedTarget).scope().node;
                                var toSlot = scope.slot;
                                var link = sfData.newLink(fromNode.id,fromSlot.id,scope.node.id,toSlot.id);
                                scope.links.push(link);
                            }
                        })

                }
            }
        }
    }]);