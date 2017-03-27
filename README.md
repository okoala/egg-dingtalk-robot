# egg-dingtalk-robot

[![NPM version][npm-image]][npm-url]
[![David deps][david-image]][david-url]
[![NPM download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-dingtalk-robot.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-dingtalk-robot
[david-image]: https://img.shields.io/david/okoala/egg-dingtalk-robot.svg?style=flat-square
[david-url]: https://david-dm.org/okoala/egg-dingtalk-robot
[download-image]: https://img.shields.io/npm/dm/egg-dingtalk-robot.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-dingtalk-robot


## Install
```bash
npm install egg-dingtalk-robot --save
```

## Getting Started
```javascript
// {app_root}/config/plugin.js
exports.dingtalkRobot = {
  enable: true,
  package: 'egg-dingtalk-robot',
};

// {app_root}/config/config.default.js
exports.dingtalkRobot = {
  // 机器人的accessToken
  accessToken: '',
};

// {app_root}/app/router.js
app.get('/sendText', function* () {
  this.body = yield this.app.dingtalkRobot.sendText('测试测试！');
});
```

## API
```javascript
app.dingtalkRobot.sendText(text, opts) - send text
app.dingtalkRobot.sendTextAt(text, atMobiles, opts) - send text at mobiles
app.dingtalkRobot.sendTextAtAll(text, opts) - send text at all
app.dingtalkRobot.sendLink(link, opts) - send link
app.dingtalkRobot.sendMarkdown(markdown, opts) - send markdown
app.dingtalkRobot.send(opts) - send raw
```

## More Information
[自定义机器人](https://open-doc.dingtalk.com/docs/doc.htm?spm=a219a.7386797.0.0.dY1Qqw&treeId=257&articleId=105735&docType=1)

## Multi Robots
```javascript
// {app_root}/config/config.default.js
exports.dingtalkRobot = {
  robots: {
    testRobot1: {
      name: '测试一号',
      accessToken: ''
    },
    testRobot2: {
      name: '测试二号',
      accessToken: ''
    }
  }
};

app.get('/multi/sendText', function* () {
  this.body = yield this.app.dingtalkRobot.get('testRobot1').sendText('测试测试！');
});
app.get('/multi/sendLink', function* () {
  this.body = yield this.app.dingtalkRobot.get('testRobot2').sendLink({
    "text": "这个即将发布的新版本，创始人陈航（花名“无招”）称它为“红树林”。而在此之前，每当面临重大升级，产品经理们都会取一个应景的代号，这一次，为什么是“红树林”？",
    "title": "时代的火车向前开",
    "picUrl": "",
    "messageUrl": "https://mp.weixin.qq.com/s?__biz=MzA4NjMwMTA2Ng==&mid=2650316842&idx=1&sn=60da3ea2b29f1dcc43a7c8e4a7c97a16&scene=2&srcid=09189AnRJEdIiWVaKltFzNTw&from=timeline&isappinstalled=0&key=&ascene=2&uin=&devicetype=android-23&version=26031933&nettype=WIFI"
  });
});
```

## How to Contribute

Please let us know what we can help, check [issues](https://github.com/okoala/egg-dingtalk-robot/issues) for bug reporting and suggestion.



