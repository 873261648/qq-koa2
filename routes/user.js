const router = require('koa-router')();
const {signup, login, info, updateInfo} = require('../controller/user');
const required = require('../units/required');
const {SuccessModule, ErrorModule} = require('../module/module');
const loginCheck = require('../middleware/loginCheck');


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
    let qq = ctx.query.qq || 0;
    let result = await info(qq, ctx.session.userInfo.qq);
    ctx.body = new SuccessModule(result);
});
router.post('/updateinfo', async (ctx, next) => {
    let result = await updateInfo(ctx.session.userInfo.qq, ctx.request.body);
    if (result.affectedRows === 0) {
        ctx.body = new ErrorModule(result);
        return;
    }
    ctx.body = new SuccessModule();
});


module.exports = router;
