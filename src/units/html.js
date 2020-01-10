const fs = require('fs'),
    path = require('path');

async function handler(ctx, next) {
    let requestPath = ctx.request.path === '/' ? '/index.html' : ctx.request.path;
    let fileName = requestPath.replace("/", '');
    let dirPath = path.join(__dirname, '../', 'views');
    let fileList = await readdir(dirPath);
    if (fileList.indexOf(fileName) === -1) {
        next();
        return;
    }
    let fullPath = path.join(__dirname, '../', 'views', fileName);
    ctx.response.type = 'html';
    ctx.body = fs.createReadStream(fullPath);
}


function readdir(dirPath) {
    return new Promise((resolve, reject) => {
        fs.readdir(dirPath, (err, fileList) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(fileList)
        });
    })
}


module.exports = function () {
    return handler
};