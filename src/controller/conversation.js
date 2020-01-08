const {exec, escape} = require("../db/mysql");
const xss = require('xss');
const {info} = require('./user');

async function add(data, isMe) {
    // 查询该列表存不存在，如果不存在就插入，存在就更新
    let sql = `SELECT id,sender,target,last_message,time,num FROM conversation WHERE sender=${data.sender} and target=${data.target}`;
    let result = await exec(sql);
    let conversationInfo = result[0] || {};
    let message = escape(xss(data.message));
    let insetSql = '';
    if (!result.length) {
        // 判断是不是自己，如果是自己的话就不增加未读条数
        let num = isMe ? 0 : 1;
        insetSql = `INSERT INTO conversation(sender,target,last_message,time,num,sticky) VALUE(${data.sender},${data.target},${message},${data.time},${num},false)`
    } else {
        let num = isMe ? conversationInfo.num : conversationInfo.num + 1;
        insetSql = `UPDATE conversation SET last_message=${message},time=${data.time},num=${num} WHERE sender=${data.sender} AND target=${data.target}`
    }
    return await exec(insetSql);
}

async function list(qq) {
    let sql = `SELECT id,sender,target,last_message,time,num,sticky FROM conversation WHERE sender=${qq} ORDER BY sticky DESC, time DESC`;
    let list = await exec(sql);
    let avatarList = list.map(async item => {
        let friendInfo = await info(item.target, item.sender);
        return {
            ...item,
            avatar: friendInfo.avatar,
            name: friendInfo.remark || friendInfo.nickname
        };
    });
    return await Promise.all(avatarList);
}

// 标记未读已读功能也用这个方法，本质上都是操作未读条数
async function clearUnread({id = 0, isRead, target = 0}) {
    let num = isRead ? Number(isRead) : 0;
    let sql = `UPDATE conversation SET num=${num} WHERE id=${id} OR target=${target}`;
    return await exec(sql);
}

async function remove(id) {
    let sql = `DELETE FROM conversation WHERE id=${id}`;
    return await exec(sql);
}

async function sticky({id, sticky}) {
    let sql = `UPDATE conversation SET sticky=${sticky} WHERE id=${id}`;
    return await exec(sql);
}

module.exports = {
    add,
    list,
    clearUnread,
    remove,
    sticky
};
