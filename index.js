/**
 * Created by gewangjie on 2016/9/14.
 */
let os = require('os'),
    express = require('express'),
    app = express(),
    path = require('path'),
    opn = require('opn'),
    server = require('http').createServer(app),
    QRCode = require("qrcode-terminal");

let localhost = '',
    port = process.env.PORT || 9100;

try {
    let network = os.networkInterfaces();
    localhost = network['en0'][1].address
} catch (e) {
    localhost = 'localhost';
}

// Terminal内绘制二维码
var url = 'http://' + localhost + ':' + port;
QRCode.setErrorLevel('Q');
QRCode.generate(url);

server.listen(port, function () {
    console.log('连接同一wifi下打开or扫码：', url);
    opn(url);
});


app.use(express.static(path.join(__dirname, 'resources')));

app.get('/', function (req, res) {
    res.sendfile("/index.html");
}); //指定静态HTML文件的位置