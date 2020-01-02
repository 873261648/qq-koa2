const {exec, escape} = require('../db/mysql');
const xss = require('xss');
const path = require('path');

function add(data) {
    let message = escape(xss(data.message));
    let sql = `INSERT INTO record(sender,target,message,time,avatar,name) 
        VALUE(${data.sender},${data.target},${message},${data.time},'${data.avatar}','${data.name}')`;
    console.log(sql);
    exec(sql);
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
