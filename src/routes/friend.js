const router = require('koa-router')();
const {find, stranger, add, agree, addList,allFriend} = require('../controller/friend');
const {SuccessModule, ErrorModule} = require('../module/module');
const required = require('../units/required');

router.prefix('/api/friend');

// 根据QQ号和手机号查找，优先QQ
router.get('/find', async (ctx, next) => {
    let requiredResult = await required(ctx, {
        qq: {required: true}
    });
    if (requiredResult) {
        ctx.body = new ErrorModule(requiredResult);
        return;
    }
    ctx.body = await find(ctx.query);
});

// 获取所有陌生人
router.get('/stranger', async (ctx, next) => {
    ctx.body = await stranger(ctx.query);
});

// 发送好友验证
router.post('/add', async (ctx, next) => {
    let requiredResult = await required(ctx, {
        id: {required: true},
        message: {},
        remark: {},
        sort: {}
    });
    if (requiredResult) {
        ctx.body = new ErrorModule(requiredResult);
        return;
    }
    let userID = ctx.session.userInfo.qq;
    ctx.body = await add(ctx.request.body, userID);
});

// 同意添加为好友
router.post('/agree', async (ctx, next) => {
    let requiredResult = await required(ctx, {
        id: {required: true}
    });
    if (requiredResult) {
        ctx.body = new ErrorModule(requiredResult);
        return;
    }
    let userID = ctx.session.userInfo.qq;
    ctx.body = await agree(ctx.request.body, userID);
});

// 好友申请列表
router.get('/addlist', async (ctx, next) => {
    // ctx.body = new SuccessModule();

    let userID = ctx.session.userInfo.qq;
    ctx.body = await addList(userID);
});

// 获取所有好友
router.get('/allfriend', async (ctx, next) => {
    let qq = ctx.session.userInfo.qq;
    ctx.body = await allFriend(qq);
});


module.exports = router;
