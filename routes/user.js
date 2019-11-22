const router = require('koa-router')();
const {signup, login} = require('../controller/user');
const required = require('../units/required');
const {SuccessModule, ErrorModule} = require('../module/module');


router.prefix('/api/user/');


router.post('/signup', async (ctx, next) => {
    let requiredResult = await required(ctx.request.body, {
        phone: {required: true, type: "string"},
        password: {required: true, type: "string"}
    });
    if (requiredResult) {
        ctx.body = new ErrorModule(requiredResult);
        return;
    }

    ctx.body = await signup(ctx.request.body);
});

router.post('/login', async (ctx, next) => {
    let requiredResult = await required(ctx.request.body, {
        phone: {required: true, type: "string"},
        password: {required: true, type: "string"}
    });
    if (requiredResult) {
        ctx.body = new ErrorModule(requiredResult);
        return;
    }
    ctx.body = await login(ctx.request.body);
});

module.exports = router;
