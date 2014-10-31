/**
 * Created by rodion on 23.10.14.
 */
'use strict';
var glob;
angular.module('SpreadsheedFlow.Nodeboard')
    .directive('sfNode',function ($timeout) {
        return {
            templateUrl: function(elem, attr){
                return 'nodeboard/node/node.html';
            },
            link: function(scope, element, attrs) {
                // Title element
                var $el = $(element);
                var startDragPoint = {x:0,y:0}
                $el.draggable()
                    .bind('mousedown', function(event, ui){
                        // bring to front
                        $el.parent().append( $el );
                        startDragPoint = {x:scope.node.x,y:scope.node.y};
                    })
                    .bind('drag', function(event, ui){
                        var translatedPoint = scope.$parent.translateFromPosition(ui.position.left - ui.originalPosition.left,ui.position.top - ui.originalPosition.top)
                        scope.node.x = startDragPoint.x+ translatedPoint.x;
                        scope.node.y = startDragPoint.y+ translatedPoint.y;
                        scope.$apply();
                    });
                scope.$watch("node", function (value) {
                    var title = $el.children(".title");
                    var rect = $el.find(".rect");
                    var w = title.width();
                    var h = title.height();
                    title.attr({x:-w/2,y:h/2-5});
                    rect.attr({x:-w/2-10,y:-h/2-7,width:w+20,height:h+14});
                    var ingoingSlots = $el.find(".ingoing");
                    var cnt = ingoingSlots.length;
                    var i;
                    for (i=0;i<cnt;i++) {
                        ingoingSlots.eq(i).attr('transform',"translate("+(i*25-(cnt-1)/2*25)+","+(-h/2-7)+")");
                    }
                    var outgoingSlots = $el.find(".outgoing");
                    cnt = outgoingSlots.length;
                    for (i=0;i<cnt;i++) {
                        outgoingSlots.eq(i).attr('transform',"translate("+(i*25-(cnt-1)/2*25)+","+(h/2+7)+")");
                    }
                    $timeout(function () { scope.$parent.$broadcast("nodePositionChange:"+scope.node.id); },0);
                }, true);

            }
        };
    })
    .directive('sfLink', function () {
        return {
            templateUrl: function(elem, attr) {
                return 'nodeboard/node/link.html'
            },
            link: function (scope, element, attrs) {
                var $el = $(element);
                var $root = $el.parent().parent();
                //console.log();
                var refresh = function () {
                    var $fromSlot = $("#slot_"+scope.link.fromSlotId);
                    var $toSlot = $("#slot_"+scope.link.toSlotId);
                    if (!$fromSlot.length || !$toSlot.length) return;
                    $fromSlot = $fromSlot[0].getBoundingClientRect();
                    $toSlot = $toSlot[0].getBoundingClientRect();
                    var rootPos = $root.position();
                    var start = scope.$parent.translateFromPosition($fromSlot.left+$fromSlot.width/2 - rootPos.left, $fromSlot.top+$fromSlot.height - rootPos.top);
                    var end = scope.$parent.translateFromPosition($toSlot.left+$toSlot.width/2 - rootPos.left, $toSlot.top - rootPos.top);
                    $el.find('path').attr('d',"M "+start.x+" "+start.y+" Q "+(start.x)+" "+(start.y+10)+" "+(start.x+end.x)/2+" "+(start.y+end.y)/2+" Q "+end.x+" "+(end.y-10)+" "+end.x+" "+end.y);
                }
                scope.$on("nodePositionChange:"+scope.link.fromNodeId, refresh);
                scope.$on("nodePositionChange:"+scope.link.toNodeId, refresh);

            }
        }
    })