'use strict';

/**
 * 钉钉机器人配置
 * @member Config#dingtalkRobot
 * @property {String} host - 机器人地址
 * @property {Object} accessToken - token
 *
 */
exports.dingtalkRobot = {
  host: 'https://oapi.dingtalk.com',
  api: '/robot/send',
  maxAtCount: 5, // 目前发现钉钉一次最多只能at5人
  requestOpts: {
    timeout: 10000,
  },
  // 机器人的accessToken
  accessToken: '',
};
