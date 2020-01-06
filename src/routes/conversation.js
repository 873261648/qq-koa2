const router = require('koa-router')();
const loginCheck = require('../middleware/loginCheck');
const required = require('../units/required');
const {SuccessModule, ErrorModule} = require('../module/module');
const {list, clearUnread} = require('../controller/conversation');

router.prefix('/api/conversation');

router.get('/list', loginCheck, async (ctx, next) => {
    let res = await list(ctx.session.userInfo.qq);
    ctx.body = new SuccessModule(res);
});

router.post('/clear_unread', loginCheck, async (ctx, next) => {
    let requiredResult = await required(ctx, {
        id: {required: true, type: "number"}
    });
    if (requiredResult) {
        ctx.body = new ErrorModule(requiredResult);
        return;
    }

    await clearUnread(ctx.request.body.id);
    ctx.body = new SuccessModule();
});

module.exports = router;
