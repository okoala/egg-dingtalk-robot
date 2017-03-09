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
  requestOpts: {
    timeout: 10000,
  },
  // 机器人的accessToken
  accessToken: '',
};
