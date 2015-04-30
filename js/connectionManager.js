/**
 * Created by atg on 09/03/2015.
 */
//Sets up and manages connection
var IDLE= 0, CONNECTING=1, CONNECTED=2;
var connectionManager = (function() {
    var status = IDLE;
    var gotData = false;
    var data = null;
    var currentStatusHandler = null;
    var currentConnectHandler = null;
    var requestHandler = null;
    var currentURL = "ws://127.0.0.1";
    var socket;

    var defaultStatusHandler = function() {
        console.log('Default status handler');
    };

    var defaultConnectHandler = function() {
        status = CONNECTED;
        console.log('Default connect handler');
    };

    var requestHandler = function() {
        console.log('Default request handler');
    };

    var dataHandler = function(data) {
        return data;
    };

    function getArgumentObject(request) {
        var args = {};
        args.request = request;
        return args;
    }

    function sendRequest(args) {
        if(!socket) {
            console.log('Not connected to server');
            return;
        }
        if(status != CONNECTED) return;

        var json = JSON.stringify(args);
        socket.send(json);
    }

    return {
        getConnectionStatus: function() {
            return status;
        },

        connect: function(statusHandler, connectHandler) {
            if(status === CONNECTING || status === CONNECTED) return;
            currentStatusHandler = (statusHandler != undefined) ? statusHandler : defaultStatusHandler;
            currentConnectHandler = (connectHandler != undefined) ? connectHandler : defaultConnectHandler;

            status = CONNECTING;
            socket = new WebSocket(currentURL);
            socket.onopen = function() {
                console.log('Socket opened');
                currentConnectHandler();
            };
            socket.onmessage = function(event) {
                data = event.data;
                gotData = true;
            };
            socket.onerror = function() {
                console.log("Socket error!");
            };
            socket.onclose = function(event) {
                status = IDLE;
                console.log('Socket closed');
            };
        },

        requestData: function() {
            var args = getArgumentObject('GetState');
            sendRequest(args);
        },

        getData: function() {
            if(gotData) {
                gotData = false;
                return data;
            } else {
                return null;
            }
        }
    }
})();
