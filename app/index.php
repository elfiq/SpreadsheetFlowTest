<!DOCTYPE html>
<html lang="en" ng-app="SpreadsheedFlow">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=windows-1251" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <title>Spreadsheets Flow</title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="bower_components/split-pane/split-pane.css" />
  <link rel="stylesheet" href="bower_components/handsontable/dist/handsontable.full.min.css" />

  <link rel="stylesheet" href="app.css">
  <link rel="stylesheet" href="components/nodeboard/node/node.css">
  <link rel="stylesheet" href="components/nodeboard/slot/slot.css">
  <link rel="stylesheet" href="components/nodeboard/link/link.css">
  <link rel="stylesheet" href="components/nodeboard/board/board.css">
</head>
<body>

    <div class="btn-group">
        <label class="btn btn-success" onclick="addRandomNode()">Random node</label>
        <label class="btn btn-success" onclick="addRandomLink()">Random link</label>
    </div>
    <div class="btn-group">
        <label class="btn btn-success" onclick="clearNodes()">Clear</label>
    </div>
    <div id="result"></div>

    <split-pane>
        <split-pane-component width="50%">
            <div id="table" data-ssh-table=""></div>
        </split-pane-component>
        <split-pane-divider width="5px"></split-pane-divider>
        <split-pane-component id="rightPanel">
            <div id="view" data-nb-board=""></div>
        </split-pane-component>
    </split-pane>

    <script src="bower_components/underscore/underscore-min.js"></script>
    <script src="bower_components/jquery/dist/jquery.min.js"></script>
    <script src="http://code.interactjs.io/interact-1.1.2.min.js"></script>
    <script src="bower_components/angular/angular.js"></script>
    <script src="bower_components/angular-animate/angular-animate.js"></script>
    <script src="bower_components/ui-bootstrap/dist/ui-bootstrap-0.11.2.min.js"></script>
    <script src="bower_components/ui-bootstrap/dist/ui-bootstrap-tpls-0.11.2.min.js"></script>
    <script src="bower_components/svg-pan-zoom/dist/svg-pan-zoom.min.js"></script>
    <script src="bower_components/jquery-mousewheel/jquery.mousewheel.min.js"></script>
    <script src="bower_components/split-pane/split-pane.js"></script>
    <script src="bower_components/angular-split-pane/angular-split-pane.js"></script>
    <script src="bower_components/handsontable/dist/handsontable.full.js"></script>
    <script src="bower_components/angular-ui-handsontable/dist/ngHandsontable.js"></script>



    <script src="components/nodeboard/board/board.js"></script>
    <script src="components/nodeboard/data.js"></script>
    <script src="components/nodeboard/node/node.js"></script>
    <script src="components/nodeboard/link/link.js"></script>
    <script src="components/nodeboard/slot/ingoing.js"></script>
    <script src="components/nodeboard/slot/outgoing.js"></script>
    <script src="components/spreadsheet/spreadsheet.js"></script>
    <script src="components/googledrive/googledrive.js"></script>

    <script src="app.js"></script>
    <script src="//apis.google.com/js/client.js?onload=onApiLoad"></script>

</body>
</html>
