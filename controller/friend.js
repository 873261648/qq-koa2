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

async function add({id: friendID, message, remark, sort}, userID) {
    let repeatSql = `SELECT * FROM add_friend WHERE user_id=${userID} AND friend_id=${friendID} OR user_id=${friendID} AND friend_id=${userID}`;
    let repeatRes = await exec(repeatSql);
    if (repeatRes.length) {
        return new ErrorModule(repeatRes, '已经发过请求了哦');
    }

    let createtime = Date.now();
    message = escape(xss(message));
    remark = escape(xss(remark));
    let sql = `INSERT INTO add_friend(user_id,friend_id,message,createtime,remark,sort,status) VALUES(${userID},${friendID},${message},${createtime},${remark},'${sort}',-1)`;
    let result = await exec(sql);
    if (result.insertId) {
        return new SuccessModule();
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
    let users = result.map(item => {
        if (item.user_id === userID) {
            return `qq=${item.friend_id}`;
        } else {
            return `qq=${item.user_id}`;
        }
    });
    let usersSql = `SELECT qq,nickname,avatar,introduction,birthday,gender,office,company,location,hometown FROM users WHERE ${users.join(' OR ')}`;
    console.log(usersSql);
    let usersResult = await exec(usersSql);



    return new SuccessModule(usersResult);
}


module.exports = {
    find,
    stranger,
    add,
    agree,
    addList
};
