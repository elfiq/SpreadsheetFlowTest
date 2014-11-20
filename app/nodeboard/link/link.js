/**
 * Created by rodion on 23.10.14.
 */
'use strict';
angular.module('SpreadsheedFlow.Nodeboard')
    .directive('sfLink', function () {
        return {
            compile:function(element, attrs) {
                return function (scope, element, attrs) {
                    var $el = $(element);
                    var refresh = function () {
                        var $fromSlot = $("#slot_"+scope.link.fromSlotId);
                        var $toSlot = $("#slot_"+scope.link.toSlotId);
                        if (!$fromSlot.length || !$toSlot.length) {
                            $el.hide();
                            return;
                        }
                        $el.show();
                        $fromSlot = $fromSlot[0].getBoundingClientRect();
                        $toSlot = $toSlot[0].getBoundingClientRect();
                        var start = scope.$parent.convertPointClientToBoard($fromSlot.left+$fromSlot.width/2, $fromSlot.top+$fromSlot.height);
                        var end = scope.$parent.convertPointClientToBoard($toSlot.left+$toSlot.width/2, $toSlot.top);
                        $el.find('path').attr('d',"M "+start.x+" "+start.y+" Q "+(start.x)+" "+(start.y+10)+" "+(start.x+end.x)/2+" "+(start.y+end.y)/2+" Q "+end.x+" "+(end.y-10)+" "+end.x+" "+end.y);
                    }
                    scope.$on("nodePositionChange:"+scope.link.fromNodeId, refresh);
                    scope.$on("nodePositionChange:"+scope.link.toNodeId, refresh);
                    scope.$watch("nodes", function(value) {
                        refresh();
                    });
                    refresh();
                }
            }
        }
    })