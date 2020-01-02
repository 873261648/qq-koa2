const router = require('koa-router')();
const loginCheck = require('../middleware/loginCheck');
const required = require('../units/required');
const {SuccessModule, ErrorModule} = require('../module/module');
const {list} = require('../controller/record');


router.prefix('/api/record');

router.get('/list', loginCheck, async (ctx, next) => {
    let requiredResult = await required(ctx, {
        qq: {required: true, type: "number"}
    });
    if (requiredResult) {
        ctx.body = new ErrorModule(requiredResult);
        return;
    }

    let res = await list(ctx.session.userInfo.qq, Number(ctx.query.qq));
    ctx.body = new SuccessModule(res);
});

module.exports = router;
