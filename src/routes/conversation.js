const router = require('koa-router')();
const loginCheck = require('../middleware/loginCheck');
const required = require('../units/required');
const {SuccessModule, ErrorModule} = require('../module/module');
const {list, clearUnread, remove, sticky} = require('../controller/conversation');

router.prefix('/api/conversation');

router.get('/list', loginCheck, async (ctx, next) => {
    let res = await list(ctx.session.userInfo.qq);
    ctx.body = new SuccessModule(res);
});

router.post('/clear_unread', loginCheck, async (ctx, next) => {
    if (!ctx.request.body.id && !ctx.request.body.target) {
        ctx.body = new ErrorModule('缺少参数id或target');
        return
    }

    await clearUnread(ctx.request.body);
    ctx.body = new SuccessModule();
});
router.post('/remove', loginCheck, async (ctx, next) => {
    let requiredResult = await required(ctx, {
        id: {required: true, type: "number"}
    });
    if (requiredResult) {
        ctx.body = new ErrorModule(requiredResult);
        return;
    }

    await remove(ctx.request.body.id);
    ctx.body = new SuccessModule();
});
router.post('/sticky', loginCheck, async (ctx, next) => {
    let requiredResult = await required(ctx, {
        id: {required: true, type: "number"},
        sticky: {required: true, type: "boolean"}
    });
    if (requiredResult) {
        ctx.body = new ErrorModule(requiredResult);
        return;
    }
    await sticky(ctx.request.body);
    ctx.body = new SuccessModule();
});


module.exports = router;
