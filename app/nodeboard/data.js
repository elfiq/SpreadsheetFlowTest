/**
 * Created by rodion on 23.11.14.
 */
angular.module('SpreadsheedFlow.Nodeboard')
    .factory('sfData', function () {
        var service = {
            getNodes:function () {
                return nodes;
            },
            addNode:function(node) {
                nodes.push(node);
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
                })
            },
            getLinks:function () {
                return links;
            },
            getLinksWhere:function (where) {
                return _(links).where(where);
            },
            addLink:function(link) {
                links.push(link);
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
                })
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

            }
        }
        return service;
    });