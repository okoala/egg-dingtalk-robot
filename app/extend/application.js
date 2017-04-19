'use strict';

const DINGTALKROBOT = Symbol('Application#dingtalkRobot');
const createDingtalkRobot = require('../../lib/robot');

module.exports = {
  /**
   * dingtalk
   * @member Application#dingtalk
   */
  get dingtalkRobot() {
    if (!this[DINGTALKROBOT]) {
      const options = Object.assign({}, this.config.dingtalkRobot);
      options.urllib = this.httpclient;
      this[DINGTALKROBOT] = createDingtalkRobot(options);
    }
    return this[DINGTALKROBOT];
  },
};
