const router = require('koa-router')();
const path = require('path');
const {SuccessModule} = require('../module/module');


router.prefix('/api/upload');

router.post('/avatar', async (ctx, next) => {
    const fullPath = ctx.request.files.file.path;
    const fileName = path.basename(fullPath);
    ctx.body = new SuccessModule({
        path: path.join('/upload', fileName)
    })
});

module.exports = router;