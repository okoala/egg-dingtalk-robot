'use strict';

const Client = require('./client');
const Message = require('./message');
const debug = require('debug')('egg-dingtalk-robot:robot');

let robotsOpt;

function getRobot(options) {
  const client = new Client(options);
  return new Message(client, options);
}

function createDingtalkRobot(options) {
  if (options.robots) {
    robotsOpt = options.robots;
    delete options.robots;
  }

  if (robotsOpt) {
    return {
      get(robotName) {
        debug('<<<< robotName >>>>', robotName);
        debug('<<<< robotOption >>>>', robotsOpt[robotName]);

        // todo improve
        return {
          async sendText(...args) {
            const robot = getRobot(Object.assign(options, robotsOpt[robotName]));
            await robot.sendText(...args);
          },
          async sendTextAt(...args) {
            const robot = getRobot(Object.assign(options, robotsOpt[robotName]));
            await robot.sendTextAt(...args);
          },
          async sendTextAll(...args) {
            const robot = getRobot(Object.assign(options, robotsOpt[robotName]));
            await robot.sendTextAll(...args);
          },
          async sendLink(...args) {
            const robot = getRobot(Object.assign(options, robotsOpt[robotName]));
            await robot.sendLink(...args);
          },
          async sendMarkdown(...args) {
            const robot = getRobot(Object.assign(options, robotsOpt[robotName]));
            await robot.sendMarkdown(...args);
          },
          async send(...args) {
            const robot = getRobot(Object.assign(options, robotsOpt[robotName]));
            await robot.send(...args);
          },
        };
      },
    };
  }

  return getRobot(options);
}

module.exports = createDingtalkRobot;
