const Websocket = require('ws');
let wsServer;

function init(server) {
    wsServer = new Websocket.Server({
        server
    });
    wsServer.on('connection', connection);
}

function connection(ws, request, client) {
    ws.send('连接成功');
    ws.on('message', function (msg) {
        return message(msg, ws)
    });
}

function message(msg, ws) {
    ws.send(JSON.stringify(msg));
}


module.exports = init;