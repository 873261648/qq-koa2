const mysql = require('mysql');
const {MYSQL_CONF} = require('../conf/db');
let con = mysql.createConnection(MYSQL_CONF);

con.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('mysql连接成功')
});

function exec(sql) {
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result)
        })
    })
}
module.exports = {
    exec,
    escape: mysql.escape
};
