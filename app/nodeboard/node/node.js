/**
 * Created by rodion on 23.10.14.
 */
'use strict';
var glob;
angular.module('SpreadsheedFlow.Nodeboard')
    .directive('sfNode',function () {
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
                        scope.node.x = startDragPoint.x+ ui.position.left - ui.originalPosition.left;
                        scope.node.y = startDragPoint.y+ ui.position.top - ui.originalPosition.top;
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
                }, true);

            }
        };
    })
    .directive('sfLink', function () {
        return {
            templateUrl: function(elem, attr) {
                return 'nodeboard/node/link.html'
            }
        }
    })