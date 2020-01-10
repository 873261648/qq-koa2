async function fn(ctx, rule) {
    let msg = '';
    let keys = Object.keys(rule);
    let params = {};
    if (ctx.method === "GET") {
        params = ctx.query;
    } else {
        params = ctx.request.body;
    }
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (rule[key].required && params[key] === undefined) {
            msg = `缺少参数：${key}`;
            return msg
        }
        if (params[key].type && typeof params[key] !== rule[key].type) {
            msg = `参数${key}应该是${rule[key].type}类型，但是得到${typeof params[key]}。`;
            return msg
        }
    }
}

module.exports = fn;