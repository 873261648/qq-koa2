const {exec, escape} = require("../db/mysql");
const xss = require('xss');
const {genPassword} = require('../units/encryp');
const {SuccessModule, ErrorModule} = require('../module/module');

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
    let sql = `SELECT qq,nickname,avatar FROM users WHERE password=${password} AND (qq=${qq} OR phone=${qq})`;
    let result = await exec(sql);
    return result[0] || {}
}

async function uploadPassword({}) {
    return new SuccessModule()
}

async function info(qq) {
    let sql = `SELECT qq,nickname,avatar,introduction FROM users WHERE qq=${qq} `;
    let result = await exec(sql);
    return result[0] || {}
}


module.exports = {
    signup,
    login,
    uploadPassword,
    info
};
