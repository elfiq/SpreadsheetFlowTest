/**
 * Created by rodion on 30.12.14.
 */


var nodes = [];
var randNodeNames = ['Test','Node','Temp','Collision','Apps','Demand','Opposition','Ultima'];
var links = [];
var randNodeId = 0;
var randSlotId = 0;
var randLinkId = 0;
function addRandomNode(instant) {
    randNodeId ++;
    var nodeName = randNodeNames[Math.floor(Math.random()*randNodeNames.length)];
    var node = {
        id:randNodeId,
        title:nodeName+' '+randNodeId,
        x:Math.round((Math.random()/2 +0.25)*$(".nodeboard").width()),
        y:Math.round((Math.random()/2 +0.25)*$(".nodeboard").height()),
        className:"style"+Math.round(Math.random()*5),
        data:{
            formulas:[],
            results:[],
            rows:Math.round(Math.random()*10)+4,
            cols:Math.round(Math.random()*10)+4,
            columnWidths:[]
        },
        ingoingSlots:[],
        outgoingSlots:[]
    };
    var inSlotsCount = 0;
    var inSlots = [];
    for (var j=0;j<node.data.cols;j++) {
        node.data.columnWidths.push(100);
    }
    for (var i=0;i<node.data.rows;i++) {
        node.data.results[i] = [];
        node.data.formulas[i] = [];
        for (var j=0;j<node.data.cols;j++) {
            if (nodes.length==0 || Math.random()<0.95) {
                node.data.formulas[i][j] = Math.round(Math.random()*100);
                node.data.results[i][j] = node.data.formulas[i][j];
            } else {
                var inNodeInd = Math.floor(Math.random()*nodes.length);
                node.data.formulas[i][j] = "=\""+nodes[inNodeInd].title+"\":A1";
                if (inSlots.indexOf(inNodeInd) == -1) {
                    inSlots.push(inNodeInd);
                    inSlotsCount++;
                }
            }
        }
    }
    for (var i=0;i<inSlots.length;i++) {
        randSlotId++;
        node.ingoingSlots.push({
            id:randSlotId,
            title:nodes[inSlots[i]].title
        });
        randLinkId++;
        var link = {
            id:randLinkId,
            fromNodeId:nodes[inSlots[i]].id,
            fromSlotId:nodes[inSlots[i]].outgoingSlots[0].id,
            toNodeId:node.id,
            toSlotId:randSlotId
        };
        addLink(link,instant);
    }
    randSlotId++;
    node.outgoingSlots.push({
        id:randSlotId,
        title:node.title
    });
    if (instant) {
        nodes.push(node);
    } else {
        $("#view").scope().$apply(function (scope) {
            nodes.push(node);
        });
    }
}
function addLink(link, instant) {
    if (instant) {
        links.push(link);
    } else {
        $("#view").scope().$apply(function (scope) {
            links.push(link);
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
    var data = {
        id:randLinkId,
        fromNodeId:nodes[fromNodeInd].id,
        fromSlotId:nodes[fromNodeInd].outgoingSlots[0].id,
        toNodeId:nodes[toNodeInd].id,
        toSlotId:nodes[toNodeInd].ingoingSlots[toSlotInd].id
    };
    addLink(data,instant);
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
    //addRandomLink(true);
    //addRandomLink(true);
    //addRandomLink(true);
}
