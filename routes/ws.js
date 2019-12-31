const {SuccessModule, ErrorModule} = require('../module/module');
const {info} = require('../controller/user');
const {add} = require('../controller/conversation');
const xss = require('xss');

let initInfo = async (data, ws) => {
    ws.userInfo = await info(data.qq, data.qq);
};

let newMessage = async (data, ws, wsServer) => {
    data.message = xss(data.message);
    wsServer.clients.forEach(item => {
        if (item.userInfo.qq === data.target) {
            item.send(JSON.stringify(data));
        }
    });
    await add(data);
};


let router = (message, ws, wsServer) => {
    let data = JSON.parse(message);
    switch (data.cmd) {
        case "initInfo":
            initInfo(data, ws);
            break;
        case "message":
            newMessage(data, ws, wsServer);
            break;
        default:
            ws.send(JSON.send(new SuccessModule('cmd参数错误！')))
    }
};


module.exports = router;
