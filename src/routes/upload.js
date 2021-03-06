const router = require('koa-router')();
const path = require('path');
const {updateInfo} = require('../controller/user');
const {SuccessModule,ErrorModule} = require('../module/module');


router.prefix('/api/upload');

router.post('/avatar', async (ctx, next) => {
    const fullPath = ctx.request.files.file.path;
    const fileName = path.basename(fullPath);

    const result = await updateInfo(ctx.session.userInfo.qq, {
        avatar: path.join('/upload', fileName)
    });
    if (result.affectedRows === 0) {
        ctx.body = new ErrorModule();
        return;
    }
    ctx.body = new SuccessModule({
        avatar:path.join('/upload', fileName)
    })
});
router.post('/home_bg', async (ctx, next) => {
    const fullPath = ctx.request.files.file.path;
    const fileName = path.basename(fullPath);

    const result = await updateInfo(ctx.session.userInfo.qq, {
        home_bg: path.join('/upload', fileName)
    });
    if (result.affectedRows === 0) {
        ctx.body = new ErrorModule();
        return;
    }
    ctx.body = new SuccessModule({
        home_bg:path.join('/upload', fileName)
    })
});

module.exports = router;
