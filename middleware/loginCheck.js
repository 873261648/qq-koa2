const {NotLoginModule} = require('../module/module');

async function loginCheck(ctx, next) {
    if (!ctx.session.id) {
        ctx.body = new NotLoginModule();
        return;
    }
    next()
}

module.exports = loginCheck;