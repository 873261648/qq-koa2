const ENV = process.env.NODE_ENV;

let MYSQL_CONF, REDIS_CONF;

if (ENV === 'dev') {
    MYSQL_CONF = {
        host: "localhost",
        user: "root",
        password: "873261648@ying",
        database: "qq"
    };
    REDIS_CONF = {
        host: "localhost",
        port: "6879"
    }
} else {
    MYSQL_CONF = {
        host: "localhost:3306",
        user: "root",
        password: "873261648@YIng",
        database: "qq"
    };
    REDIS_CONF = {
        host: "localhost",
        port: "6879"
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
};
