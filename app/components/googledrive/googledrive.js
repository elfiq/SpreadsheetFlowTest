/**
 * Created by rodion on 29.12.14.
 */

'use strict';

/**
 * Options for the Realtime loader.
 */
var realtimeOptions = {
    /**
     * Client ID from the console.
     */
    clientId: '405406518882-faa5l72cmqam2o09d2b9ltbhp45b74ph.apps.googleusercontent.com',

    /**
     * The ID of the button to click to authorize. Must be a DOM element ID.
     */
    authButtonElementId: 'authorizeButton',

    /**
     * Function to be called when a Realtime model is first created.
     */
   // initializeModel: initializeModel,

    /**
     * Autocreate files right after auth automatically.
     */
    autoCreate: false,

    /**
     * The name of newly created Drive files.
     */
    defaultTitle: "New Realtime Quickstart File",

    /**
     * The MIME type of newly created Drive Files. By default the application
     * specific MIME type will be used:
     *     application/vnd.google-apps.drive-sdk.
     */
    newFileMimeType: null, // Using default.

    /**
     * Function to be called every time a Realtime file is loaded.
     */
   // onFileLoaded: onFileLoaded,

    /**
     * Function to be called to inityalize custom Collaborative Objects types.
     */
    registerTypes: null, // No action.

    /**
     * Function to be called after authorization and before loading files.
     */
    afterAuth: null // No action.
}

/**
 * Start the Realtime loader with the options.
 */
function startRealtime() {
    var realtimeLoader = new rtclient.RealtimeLoader(realtimeOptions);
    realtimeLoader.start();
}

angular
    .module('GoogleDrive', [])
    .factory('gdRealtime', function () {
        var service = {

        }
        return service;
    });