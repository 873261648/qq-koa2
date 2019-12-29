const Websocket = require('ws');
const wsRouter = require('../routes/ws');
let wsServer;


function init(server) {
    wsServer = new Websocket.Server({server});
    wsServer.on('connection', connection);
    return wsServer
}

function connection(ws, request, client) {
    ws.on('message', function (msg) {
        console.log(msg);
        wsRouter(msg, ws, wsServer)
    });
}

module.exports = init;
