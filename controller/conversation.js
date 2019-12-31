const {exec, escape} = require("../db/mysql");
const xss = require('xss');

async function add(data) {
    let sql = `SELECT id,user_id,friend_id,last_message,time,num,avatar,name FROM conversation WHERE user_id=${data.sender} and friend_id=${data.target}`;
    let result = await exec(sql);
    let conversationInfo = result[0] || {};
    let message = escape(data.message);
    let insetSql = '';
    if (!result.length) {
        insetSql = `INSERT INTO conversation(user_id,friend_id,last_message,time,num,avatar,name) VALUE(${data.sender},${data.target},${message},${data.time},1,'${data.avatar}','${data.name}')`
    } else {
        console.log(conversationInfo);
        let num = conversationInfo.num + 1;
        insetSql = `UPDATE conversation SET last_message=${message},time=${data.time},num=${num},avatar='${data.avatar}',name='${data.name}' WHERE user_id=${data.sender} and friend_id=${data.target}`
    }
    await exec(insetSql);
}

module.exports = {
    add
};
