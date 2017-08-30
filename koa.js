const Koa = require('koa');
const app = new Koa();
const fs = require('fs');

const path = require('path');
const serve = require('koa-static');

console.log(__dirname);

const static_res = serve(path.join(__dirname + '/resources/'));
app.use(static_res);

const main = ctx => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./resources/index.html');
};
app.use(main);

app.listen(3000);

console.log('koa 监听开启');