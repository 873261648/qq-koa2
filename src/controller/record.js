const {exec, escape} = require('../db/mysql');
const xss = require('xss');

async function add(data) {
    let message = escape(xss(data.message));
    // 存入数据库后会被转义，所以多一个；
    let avatar = data.avatar.replace(/\\/g,'\\\\');
    let sql = `INSERT INTO record(sender,target,message,time,avatar,name) 
        VALUE(${data.sender},${data.target},${message},${data.time},'${avatar}','${data.name}')`;
    return await exec(sql);
}

async function list(userID, friendID) {
    let sql = `SELECT id,sender,target,message,time,avatar,name
    FROM record 
    WHERE (sender=${userID} AND target=${friendID}) OR (sender=${friendID} AND target=${userID})
    ORDER BY time`;
    return await exec(sql);
}

module.exports = {
    add,
    list
};
