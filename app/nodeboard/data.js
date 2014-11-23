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
                _(removeNodes).each(function(node) {
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
            }
        }
        return service;
    });