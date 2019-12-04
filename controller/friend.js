const {SuccessModule, ErrorModule} = require('../module/module');
const {exec, escape} = require('../db/mysql');
const xss = require('xss');

async function find({phone}) {
    phone = escape(xss(phone));
    let sql = `SELECT qq,phone,nickname,avatar FROM users WHERE phone=${phone}`;
    let result = await exec(sql);
    return new SuccessModule(
        result[0] || {}
    );
}

async function stranger() {
    let sql = `SELECT qq,phone,nickname,avatar FROM users`;
    let result = await exec(sql);
    return new SuccessModule(result);
}

async function add({friendID, message}, userID) {
    let createtime = Date.now();
    message = escape(xss(message));
    let sql = `INSERT INTO add_friend(user_id,friend_id,message,createtime,status) VALUE(${userID},${friendID},${message},${createtime},0)`;
    let result = await exec(sql);
    if (result.insertId) {
        return new SuccessModule(result.insertId);
    } else {
        return new ErrorModule(result);
    }
}

async function agree({friendID}, userID) {
    // 先更新状态为已通过，在将好友添加到friend表里
    let sql = `UPDATE friend SET status=1' WHERE user_id=${userID} AND friend_id=${friendID}`;
    let result = await exec(sql);
    let createtime = Date.now();
    let addSql = `INSERT INTO friend(user_id,friend_id,createtime) VALUE(${userID},${friendID},${createtime})`;
    let addResult = await exec(addSql);
    if (addResult.insertId) {
        return new SuccessModule();
    } else {
        return new ErrorModule(result);
    }
}

async function addList(userID) {
    let sql = `SELECT * FROM add_friend WHERE user_id=${userID} OR friend_id=${userID} ORDER BY createtime DESC`;
    let result = await exec(sql);
    return new SuccessModule(result);
}


module.exports = {
    find,
    stranger,
    add,
    agree,
    addList
};
