/**
 * Created by rodion on 23.11.14.
 */
angular.module('Nodeboard')
    .factory('nbData', function () {
        var watchers = {
            links:0,
            nodes:0
        };
        var service = {
            getNodes:function () {
                return nodes;
            },
            addNode:function(node) {
                nodes.push(node);
                watchers.nodes++;
                return true;
            },
            removeNodes:function(removeNodes) {
                if (!$.isArray(removeNodes)) {
                    removeNodes = [removeNodes];
                }
                var ind;
                var that = this;
                _(removeNodes).each(function(node) {
                    var removeLinks = that.getLinksWhere({toNodeId:node.id});
                    that.removeLinks(removeLinks);
                    removeLinks = that.getLinksWhere({fromNodeId:node.id});
                    that.removeLinks(removeLinks);
                    ind = nodes.indexOf(node);
                    if (ind<0) return;
                    nodes.splice(ind,1);
                });
                watchers.nodes++;
                return true;
            },
            getLinks:function () {
                return links;
            },
            getLinksWhere:function (where) {
                return _(links).where(where);
            },
            addLink:function(link) {
                links.push(link);
                watchers.links++;
                return true;
            },
            removeLinks:function(removeLinks) {
                if (!$.isArray(removeLinks)) {
                    removeLinks = [removeLinks];
                }
                var ind;
                _(removeLinks).each(function(link) {
                    ind = links.indexOf(link);
                    if (ind<0) return;
                    links.splice(ind,1);
                });
                watchers.links++;
                return true;
            },
            newLink:function(fromNodeId,fromSlotId,toNodeId,toSlotId) {
                var maxId = 0;
                if (links.length) {
                    maxId = _.max(links, function (item) {
                        return item.id
                    }).id;
                }
                return {
                    fromSlotId:fromSlotId,
                    fromNodeId:fromNodeId,
                    toSlotId:toSlotId,
                    toNodeId:toNodeId,
                    id:maxId+1
                }

            },
            getWatchers:function() {
                return watchers;
            },
            fillRandomData:function() {
                fillRandomData();
            }
        }
        return service;
    });


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
