const {exec, escape} = require("../db/mysql");
const xss = require('xss');
const {info} = require('./user');

async function add(data) {
    // 查询该列表存不存在，如果不存在就插入，存在就更新
    let sql = `SELECT id,sender,target,last_message,time,num,avatar,name FROM conversation WHERE sender=${data.sender} and target=${data.target}`;
    let result = await exec(sql);
    let conversationInfo = result[0] || {};
    // 查出好友的信息存进会话列表
    let friendInfo = await info(data.target, data.target);
    let message = escape(xss(data.message));
    let insetSql = '';
    if (!result.length) {
        insetSql = `INSERT INTO conversation(sender,target,last_message,time,num,avatar,name) VALUE(${data.sender},${data.target},${message},${data.time},1,'${friendInfo.avatar}','${data.name}')`
    } else {
        let num = conversationInfo.num + 1;
        insetSql = `UPDATE conversation SET last_message=${message},time=${data.time},num=${num},avatar='${friendInfo.avatar}',name='${data.name}' WHERE sender=${data.sender} AND target=${data.target}`
    }
    exec(insetSql);
}

async function list(qq) {
    let sql = `SELECT id,sender,target,last_message,time,num,avatar,name FROM conversation WHERE sender=${qq} ORDER BY time desc`;
    return exec(sql);
}

module.exports = {
    add,
    list
};
