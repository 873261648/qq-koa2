const {REDIS_CONF} = require("../conf/db");
const redis = require('koa-redis');

const redisStore = redis({all: `${REDIS_CONF.host}:${REDIS_CONF.port}`});
const redisClient = redisStore.client;

// 监控异常
redisStore.on('error', err => {
    console.error(err)
});


function redisGet(key) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err);
                return;
            }
            if (val === null) {
                resolve(val)
            }
            try {
                resolve(JSON.parse(val))
            } catch (e) {
                resolve(val)
            }
        })
    })
}

function redisSet(key, val) {
    if (typeof val) {
        redisClient.set(key, JSON.stringify(val));
        return;
    }
    redisClient.set(key, val)
}


function redisDel(key) {
    redisClient.del(key);
}

module.exports = {
    redisStore,
    redisGet,
    redisSet,
    redisDel
};
