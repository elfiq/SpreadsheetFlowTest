//'use strict';

// Declare app level module which depends on views, and components
angular.module('SpreadsheedFlow', [
    'GoogleDrive',
  'Nodeboard',
  'Spreadsheet',
  'ui.bootstrap',
  'ngAnimate',
  'shagstrom.angular-split-pane'
])
    .controller('sfController',['$scope',function($scope) {
        $scope.src="sdsda";
        $scope.currentNode = undefined;
        $scope.$watch("currentNode", function(value) {
            //$scope.spreadsheet.data = value.data;
        });
    }]);

/*
// The Browser API key obtained from the Google Developers Console.
var developerKey = 'AIzaSyDIecmUmtXQD0gUzLn9DAwRjnKc5pVmXLQ';

// The Client ID obtained from the Google Developers Console.
var clientId = '405406518882-faa5l72cmqam2o09d2b9ltbhp45b74ph.apps.googleusercontent.com';

// Scope to use to access user's drive.
var scope = ['https://www.googleapis.com/auth/drive.readonly','https://spreadsheets.google.com/feeds'];

var pickerApiLoaded = false;
var oauthToken;

// Use the API Loader script to load google.picker and gapi.auth.
function onApiLoad() {
    gapi.load('auth', {'callback': onAuthApiLoad});
    gapi.load('picker', {'callback': onPickerApiLoad});
    gapi.client.load('drive', 'v2', function() {
        console.log('drive api loaded');
    });
}

function onDriveApiLoad() {
    console.log('drive api loaded');
}

function onAuthApiLoad() {
    window.gapi.auth.authorize(
        {
            'client_id': clientId,
            'scope': scope,
            'immediate': false
        },
        handleAuthResult);
}

function onPickerApiLoad() {
    pickerApiLoaded = true;
    createPicker();
}

function handleAuthResult(authResult) {
    if (authResult && !authResult.error) {
        oauthToken = authResult.access_token;
        createPicker();
    }
}

// Create and render a Picker object for picking user Photos.
function createPicker() {
    if (pickerApiLoaded && oauthToken) {
        var picker = new google.picker.PickerBuilder().
            addView(google.picker.ViewId.SPREADSHEETS).
            setOAuthToken(oauthToken).
            setDeveloperKey(developerKey).
            setCallback(pickerCallback).
            build();
        picker.setVisible(true);
    }
}

// A simple callback implementation.
function pickerCallback(data) {
    var url = 'nothing';
    if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
        var doc = data[google.picker.Response.DOCUMENTS][0];
        url = doc[google.picker.Document.URL];
        console.log(doc);

    }
    var message = 'You picked: ' + url;
    document.getElementById('result').innerHTML = message;
}*/
