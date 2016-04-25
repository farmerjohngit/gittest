var express = require('express');
var router = express.Router();
var crawler = require('../SimultaeApi');
var querystring = require("querystring");
var eventproxy = require('eventproxy');
var iconv = require('iconv-lite');
const charset = require('superagent-charset');
var weixin      = require('weixin-api');
router.get('/', function (req, res, next) {
    // 签名成功
    if (weixin.checkSignature(req)) {
        res.status(200).send(req.query.echostr);
    } else {
        res.status(200).send('fail');
    }
});
var capt_cookie;
router.get('/crawler', function (req, res) {
    crawler.get_captcha(function (cookie) {
        capt_cookie = cookie;
        console.log('first cookie: ' + cookie);
    });
    res.render('crawler', {title: 'Hello, World!'})
});
router.get('/login', function (req, res) {
    console.log('login cookie: ' + capt_cookie);
    var ep = new eventproxy();
    ep.after('login', 1, function () {
        queryTimetable(ep)
    });
    ep.after('queryTimetable', 1, function (content) {
        console.log('rep text: :   ' + content);
        res.send(content.toString());
    });

    crawler.login(req.query.capt, capt_cookie, function (err, resp1) {
        ep.emit('login');
    });
});

function queryTimetable(ep) {
    crawler.queryTimetable(capt_cookie, function (err, resp) {
        var str = resp.text.toString();
        var pos = str.indexOf('<HEAD>', 0) + '<HEAD>'.length;
        var base = '\n <base href="http://220.168.44.238/" /> \n';
        str = str.substring(0, pos) + base + str.substring(pos + 1, str.length);
        ep.emit('queryTimetable', str);

    });
}
module.exports = router;
