const Koa = require('koa');
const app = new Koa();
const session = require('koa-generic-session');
const views = require('koa-views');
const json = require('koa-json');
const koaBody = require('koa-body');
const onerror = require('koa-onerror');
const logger = require('koa-logger');
const path = require('path');
const index = require('./routes');
const users = require('./routes/user');
const friend = require('./routes/friend');
const upload = require('./routes/upload');
const conversation = require('./routes/conversation');
const record = require('./routes/record');
const {redisStore, redisSet} = require('./db/redis');


// error handler
onerror(app);

// 配置session
app.keys = ['WJiol#23123_'];
app.use(session({
    // 设置cookie
    cookie: {
        path: "/",
        httpOnly: true,
        SameSite: "Strict",
        maxAge: 1000 * 60 * 60 * 24
    },
    store: redisStore
}));
// middleWares
app.use(koaBody({
    multipart: true, // 支持文件上传
    formidable: {
        uploadDir: path.join(__dirname, '../', 'public/upload/'), // 设置文件上传目录
        keepExtensions: true,    // 保持文件的后缀
        maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小,
    }
}));


app.use(json());
app.use(logger());
app.use(require('koa-static')(path.join(__dirname, '../', '/public')));

app.use(views(__dirname + '/views', {
    extension: 'pug'
}));

// logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(friend.routes(), friend.allowedMethods());
app.use(upload.routes(), upload.allowedMethods());
app.use(conversation.routes(), conversation.allowedMethods());
app.use(record.routes(), record.allowedMethods());


// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app;
