# egg-dingtalk-robot

### Install
```shell
npm install egg-dingtalk-robot
```

### Useage
```
// {app_root}/config/plugin.js
exports.dingtalkRobot = {
  enable: true,
  package: 'egg-dingtalk-robot',
};

// {app_root}/app/router.js
app.get('/sendText', function* () {
  this.body = yield this.app.dingtalkRobot.sendText('测试测试！');
});
```

### API
```javascript
this.app.dingtalkRobot.sendText
this.app.dingtalkRobot.sendLink
this.app.dingtalkRobot.sendMarkdown
this.app.dingtalkRobot.send
```

### Configuration
```javascript
exports.dingtalkRobot = {
  host: 'https://oapi.dingtalk.com',
  api: '/robot/send',
  requestOpts: {
    timeout: 10000,
  },
  // 机器人的accessToken
  accessToken: '',
};
```



