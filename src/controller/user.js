const {exec, escape} = require("../db/mysql");
const xss = require('xss');
const {genPassword} = require('../units/encryp');
const {SuccessModule, ErrorModule} = require('../module/module');
const {redisGet, redisSet, redisDel} = require('../db/redis');

async function signup({phone, password}) {
    phone = escape(xss(phone));
    password = escape(xss(genPassword(password)));
    // 验证手机号是否重复
    let select = await exec(`SELECT phone FROM users WHERE phone=${phone}`);
    if (select.length) {
        return new ErrorModule('手机号已存在')
    }

    let createtime = Date.now();
    let random = Math.ceil(Math.random() * 10);
    let avatar = `/upload/default${random}.png`;
    let sql = `INSERT INTO users(phone,nickname,password,createtime,avatar) VALUES(${phone},${phone},${password},${createtime},'${avatar}')`;
    let result = await exec(sql);
    return new SuccessModule(result.insertId)
}

async function login({qq, password}) {
    qq = escape(xss(qq));
    password = escape(xss(genPassword(password)));
    let sql = `SELECT qq,nickname,avatar,introduction,birthday,gender,office,company,location,hometown,email,home_bg FROM users WHERE password=${password} AND (qq=${qq} OR phone=${qq})`;
    let result = await exec(sql);
    return result[0] || {}
}

async function uploadPassword({}) {
    return new SuccessModule()
}

async function info(selectID, userID) {
    // 获取用户信息，参数qq，不传默认查自己的
    let qq = selectID || userID;
    let userInfo;
    let userInfoAtRedis = await redisGet(`userInfo:${qq}`);
    if (userInfoAtRedis) {
        userInfo = userInfoAtRedis;
    } else {
        let sql = `SELECT qq,nickname,avatar,introduction,birthday,gender,office,company,location,hometown,email,home_bg FROM users WHERE qq=${qq} `;
        let result = await exec(sql);
        userInfo = result[0] || {};
        redisSet(`userInfo:${qq}`, userInfo);
    }
    userInfo.areYouFriends = false;
    // 如果这个人不是自己，查一下这个人是否是自己的好友；
    if (selectID !== undefined && selectID !== userID) {
        let friendSql = `SELECT remark,sort FROM friend WHERE user_id=${userID} AND friend_id=${selectID}`;
        let friendRes = await exec(friendSql);
        if (friendRes.length) {
            userInfo = {
                ...userInfo,
                areYouFriends: true,
                remark: friendRes[0].remark,
                sort: friendRes[0].sort,
            }
        }
    }
    return userInfo
}

async function updateInfo(qq, userInfo) {
    // 删除redis中的缓存的信息，再次获取新的
    redisDel(`userInfo:${qq}`);

    let keys = Object.keys(userInfo);
    let values = keys.map(key => {
        return `${key}=${escape(xss(userInfo[key]))}`
    });
    let sql = `UPDATE users SET ${values.join(',')} WHERE qq=${qq}`;
    return await exec(sql)
}


module.exports = {
    signup,
    login,
    info,
    uploadPassword,
    updateInfo
};
