const {REDIS_CONF} = require("../conf/db"), redis = require('redis');

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);

// 监控异常
redisClient.on('error', err => {
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
    console.log(key);
    redisGet(key).then(val => {
        console.log(val)
    })

}

module.exports = {
    redisGet,
    redisSet,
    redisDel
};