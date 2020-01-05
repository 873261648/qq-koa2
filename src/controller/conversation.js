const {exec, escape} = require("../db/mysql");
const xss = require('xss');
const {info} = require('./user');

async function add(data) {
    // 查询该列表存不存在，如果不存在就插入，存在就更新
    let sql = `SELECT id,sender,target,last_message,time,num FROM conversation WHERE sender=${data.sender} and target=${data.target}`;
    let result = await exec(sql);
    let conversationInfo = result[0] || {};
    // 查出好友的信息存进会话列表
    let message = escape(xss(data.message));

    let insetSql = '';
    if (!result.length) {
        insetSql = `INSERT INTO conversation(sender,target,last_message,time,num) VALUE(${data.sender},${data.target},${message},${data.time},1)`
    } else {
        let num = conversationInfo.num + 1;
        insetSql = `UPDATE conversation SET last_message=${message},time=${data.time},num=${num} WHERE sender=${data.sender} AND target=${data.target}`
    }
    let insetRes = await exec(insetSql);
    return insetRes;
}

async function list(qq) {
    let sql = `SELECT id,sender,target,last_message,time,num FROM conversation WHERE sender=${qq} ORDER BY time desc`;
    let list = await exec(sql);
    let avatarList = list.map(async item => {
        let friendInfo = await info(item.target, item.sender);
        return {
            ...item,
            avatar:friendInfo.avatar,
            name:friendInfo.remark || friendInfo.nickname
        };
    });
    return await Promise.all(avatarList);
}

module.exports = {
    add,
    list
};
