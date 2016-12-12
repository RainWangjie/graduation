/**
 * Created by gewangjie on 2016/9/14.
 */
var express = require('express'),
    app = express(),
    path = require('path'),
    server = require('http').createServer(app);


server.listen(process.env.PORT || 9100, function () {
    console.log('success');
});


app.use(express.static(path.join(__dirname, 'resources')));

app.get('/', function (req, res) {
    res.sendfile("/index.html");
}); //指定静态HTML文件的位置