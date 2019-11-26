const router = require('koa-router')();
const {signup, login} = require('../controller/user');
const required = require('../units/required');
const {SuccessModule, ErrorModule} = require('../module/module');


router.prefix('/api/user/');


router.post('/signup', async (ctx, next) => {
    let requiredResult = await required(ctx, {
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
    let requiredResult = await required(ctx, {
        qq: {required: true, type: "string"},
        password: {required: true, type: "string"}
    });
    if (requiredResult) {
        ctx.body = new ErrorModule(requiredResult);
        return;
    }
    let result = await login(ctx.request.body);
    if (!result.qq) {
        ctx.body = new ErrorModule('手机号或密码错误！');
        return;
    }
    ctx.session = result;
    ctx.body = new SuccessModule(result);
});

router.post('/logout', async (ctx, next) => {
    ctx.session = null;
    ctx.body = new SuccessModule();
});

router.get('/aaa', async (ctx, next) => {
    ctx.body = new SuccessModule()
});


module.exports = router;
