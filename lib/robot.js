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
          * sendText(...args) {
            const robot = getRobot(Object.assign(options, robotsOpt[robotName]));
            yield robot.sendText(...args);
          },
          * sendTextAt(...args) {
            const robot = getRobot(Object.assign(options, robotsOpt[robotName]));
            yield robot.sendTextAt(...args);
          },
          * sendTextAll(...args) {
            const robot = getRobot(Object.assign(options, robotsOpt[robotName]));
            yield robot.sendTextAll(...args);
          },
          * sendLink(...args) {
            const robot = getRobot(Object.assign(options, robotsOpt[robotName]));
            yield robot.sendLink(...args);
          },
          * sendMarkdown(...args) {
            const robot = getRobot(Object.assign(options, robotsOpt[robotName]));
            yield robot.sendMarkdown(...args);
          },
          * send(...args) {
            const robot = getRobot(Object.assign(options, robotsOpt[robotName]));
            yield robot.send(...args);
          },
        };
      },
    };
  }

  return getRobot(options);
}

module.exports = createDingtalkRobot;
