/**
 * Created by rodion on 30.12.14.
 */


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
        data:[],
        rows:Math.round(Math.random()*10),
        cols:Math.round(Math.random()*10),
        ingoingSlots:[],
        outgoingSlots:[]
    };
    for(var i=0;i<node.rows;i++) {
        node.data[i] = [];
        for(var j=0;j<node.cols;j++) {
            node.data[i][j] = Math.round(Math.random()*100);
        }
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
