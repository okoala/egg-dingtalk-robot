'use strict';

const assert = require('assert');
const debug = require('debug')('egg-dingtalk-robot:message');

module.exports = class Message {
  constructor(client, options) {
    this.client = client;
    this.options = options;

    this.api = options.api || '/robot/send';
  }

  * sendText(text, opts) {
    assert(text, 'text required');
    assert(typeof text === 'string', 'text must be a string');

    return yield this.send(
      Object.assign({ msgtype: 'text', text: { content: text } }, opts)
    );
  }

  * sendTextAt(text, atMobiles, opts = {}) {
    assert(text, 'text required');
    assert(atMobiles, 'atMobiles required');
    assert(typeof text === 'string', 'text must be a string');
    assert(Array.isArray(atMobiles), 'atMobiles must be a array');

    return yield this.send(
      Object.assign({ msgtype: 'text', text: { content: text } }, opts, {
        at: {
          atMobiles,
        },
      })
    );
  }

  * sendTextAtAll(text, opts = {}) {
    assert(text, 'text required');
    assert(typeof text === 'string', 'text must be a string');

    return yield this.send(
      Object.assign({ msgtype: 'text', text: { content: text } }, opts, {
        at: {
          isAtAll: true,
        },
      })
    );
  }

  * sendLink(link, opts) {
    assert(link, 'link required');
    assert(link.title, 'link.title required');
    assert(link.text, 'link.text required');
    assert(link.messageUrl, 'link.messageUrl required');

    return yield this.send(
      Object.assign({ msgtype: 'link', link }, opts)
    );
  }

  * sendMarkdown(markdown, opts) {
    assert(markdown, 'markdown required');
    assert(markdown.title, 'markdown.title required');
    assert(markdown.text, 'markdown.text required');

    return yield this.send(
      Object.assign({ msgtype: 'markdown', markdown }, opts)
    );
  }

  * send(data) {
    debug('<<<< send >>>>', data);
    debug('<<<< options >>>>', this.options);

    if (data.at && data.at.atMobiles) {
      assert(data.at.atMobiles.length <= this.options.maxAtCount,
        'at.atMobiles length must less than' + this.options.maxAtCount);
    }
    return yield this.client.post(this.api, data);
  }
};
