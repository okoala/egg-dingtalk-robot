'use strict';

const assert = require('assert');
const Client = require('./client');
const debug = require('debug')('egg-dingtalk-robot:robot');

module.exports = class Robot {
  constructor(options) {
    this.options = options;
    this.client = new Client(options);

    this.api = options.api || '/robot/send';
  }

  sendText(text, opts) {
    assert(text, 'text required');
    assert(typeof text === 'string', 'text must be a string');

    return this.send(
      Object.assign({ msgtype: 'text', text: { content: text } }, opts)
    );
  }

  sendLink(link, opts) {
    assert(link, 'link required');
    assert(link.title, 'link.title required');
    assert(link.text, 'link.text required');
    assert(link.messageUrl, 'link.messageUrl required');

    return this.send(
      Object.assign({ msgtype: 'link', link }, opts)
    );
  }

  sendMarkdown(markdown, opts) {
    assert(markdown, 'markdown required');
    assert(markdown.title, 'markdown.title required');
    assert(markdown.text, 'markdown.text required');

    return this.send(
      Object.assign({ msgtype: 'markdown', markdown }, opts)
    );
  }

  send(data) {
    debug('>>>> send >>>>', data);
    return this.client.post(this.api, data);
  }
};
