const router = require('koa-router')();
const {signup, login, info} = require('../controller/user');
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
        ctx.body = new ErrorModule('QQ号或密码错误！');
        return;
    }
    ctx.session.userInfo = result;
    ctx.body = new SuccessModule(result);
});

router.post('/logout', async (ctx, next) => {
    ctx.session = null;
    ctx.body = new SuccessModule();
});

// 获取用户信息，参数qq，不传默认查自己的
router.get('/info', async (ctx, next) => {
    let qq = ctx.query.qq || ctx.session.userInfo.qq;
    let result = await info(qq);
    ctx.body = new SuccessModule(result);
});


module.exports = router;
