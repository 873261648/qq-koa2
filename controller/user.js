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
        return new SuccessModule('手机号已存在')
    }

    let createtime = Date.now();
    let random = Math.ceil(Math.random() * 10);
    let avatar = `/public/update/default${random}.png`;
    let sql = `INSERT INTO users(phone,nickname,password,createtime,avatar) VALUES(${phone},${phone},${password},${createtime},'${avatar}')`;
    let result = await exec(sql);
    return new SuccessModule(result.insertId)
}

async function login({phone, password}) {
    phone = escape(xss(phone));
    password = escape(xss(genPassword(password)));
    let sql = `SELECT id,phone,nickname,avatar FROM users WHERE phone=${phone} AND password=${password}`;
    let result = await exec(sql);
    return result[0] || {}
}

async function uploadPassword({id, phone, password}) {
    return new SuccessModule()
}

module.exports = {
    signup,
    login,
    uploadPassword
};