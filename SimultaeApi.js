var sa = require('superagent');
var express = require('express');
var querystring = require("querystring");
var fs = require('fs');
const charset = require('superagent-charset');
charset(sa);

var url = 'http://220.168.44.238/default2.aspx';
var query_url = 'http://220.168.44.238/xskbcx.aspx?xh=20124609&xm=%u5f20%u9075%u6636&gnmkdm=N121603';

function getContent(name, password, serCode) {

    var contents = {
        '__VIEWSTATE': '/wEPDwUKMTMzMzIxNTg3OWRkCI6FFDmmlh9WgeV6FG/RB8ibLSw=',
        '__VIEWSTATEGENERATOR': '09394A33',
        '__EVENTVALIDATION': '/wEWDAKl8emDCQKl1bKzCQLs0fbZDAKEs66uBwK/wuqQDgKAqenNDQLN7c0VAuaMg+INAveMotMNAoznisYGArursYYIAt+RzN8I+WBXmgDMJ6svAWqiRdPPuxYMdCc=',
        'txtUserName': name,
        'TextBox2': password,
        'txtSecretCode': serCode,
        'RadioButtonList1': '(unable to decode value)',
        'Button1': '',
        'lbLanguage': ''
    };
    return contents;
}
function getHeader(conStr, cookie, referer) {

    var header = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'en-US,en;q=0.8',
        'Cache-Control': 'max-age=0',
        'Content-Length': conStr.length,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': cookie,
        'Host': '220.168.44.238',
        'Origin': 'http://220.168.44.238',
        'Proxy-Connection': 'keep-alive',
        'Referer': referer,
        'Upgrade-Insecure-Requests': 1,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.110 Safari/537.36'

    }
    return header;
}
function getQueryContent() {

    var contents = {
        '__EVENTTARGET': 'xnd',
        '__EVENTARGUMENT': '',
        '__LASTFOCUS': '',
        '__VIEWSTATE': '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',
        '__VIEWSTATEGENERATOR': '817A6D9A',
        '__EVENTVALIDATION': '/wEWCwLT/736AgLOmbWVDAKf8qKVAwKc8ubVAQKd8oqVAgKC8s5VAs6Z6ZUMAsH2w3sCwPbDewLD9sN7Av7pjKgK2J6oo5HTM6TePO9jLkvLz5f16kA=',
        'xnd': '2013-2014',
        'xqd': '2'
    };
    return contents;
}

function getCaptcha(cookie) {

    var seUrl = 'http://220.168.44.238/CheckCode.aspx?';
    sa.get(seUrl).accept('image/Gif; charset=gb2312').end(function (err, resp) {
        //写入文件
        fs.writeFile('/Users/farmerjohn/WebstormProjects/WxPublic/public/images/message.png', resp.body, function (err) {
            if (err) throw err;
            console.log('It\'s saved!'); //文件被保存
        });
        console.log('cookie: ' + resp.header['set-cookie'].join(',').split(';')[0]);
        cookie(resp.header['set-cookie'].join(',').split(';')[0]);
    });
}

function login(captcha, cookie, end_fun) {
    console.log('captcha: ' + captcha);
    var txt = "以上程序使用fs.readFileSync从源路径读取文件内容，并使用fs.writeFileSync将文件内容写入目标路径。";
    var content = getContent('20124609', '431002199501293011', captcha);
    var contentStr = querystring.stringify(content);
    console.log('req witch cookie ' + cookie);
    var header = getHeader(contentStr, cookie, 'http://220.168.44.238/default2.aspx');
    sa.post(url).charset('gb2312').set(header).type('form').send(content).end(end_fun);
}

function queryTimetable(cookie, end_fun) {
    var content = getQueryContent();
    var contentStr = querystring.stringify(content);
    console.log('req witch cookie ' + cookie);
    var header = getHeader(contentStr, cookie, 'http://220.168.44.238/xs_main.aspx?xh=20124609');
    sa.post(query_url).charset('gb2312').set(header).type('form').send(content).end(end_fun);
}

module.exports.login = login;
module.exports.get_captcha = getCaptcha;
module.exports.queryTimetable = queryTimetable;
