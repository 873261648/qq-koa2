const router = require('koa-router')();
const loginCheck = require('../middleware/loginCheck');
const {SuccessModule, ErrorModule} = require('../module/module');
const {list} = require('../controller/conversation');

router.prefix('/api/conversation/');

router.get('/list',loginCheck,async (ctx, next) => {
    let res = await list(ctx.session.userInfo.qq);
    ctx.body = new SuccessModule(res);
});

module.exports = router;
