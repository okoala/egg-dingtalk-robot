"use strict";

const urllib = require("urllib");
const Agent = require("agentkeepalive");
const HttpsAgent = require("agentkeepalive").HttpsAgent;
const assert = require("assert");
const URLLIB = Symbol("URLLIB");
const debug = require("debug")("egg-dingtalk-robot:client");

module.exports = class Client {
  constructor(options) {
    assert(options.accessToken, "options accessToken required");

    this.options = options;
  }

  get urllib() {
    if (!this[URLLIB]) {
      // 直接传递 urllib 实例
      if (this.options.urllib && this.options.urllib.request) {
        this[URLLIB] = this.options.urllib;
      } else {
        // urllib 配置
        const opts = Object.assign(
          {
            keepAlive: true,
            keepAliveTimeout: 30000,
            timeout: 30000,
            maxSockets: Infinity,
            maxFreeSockets: 256
          },
          this.options.urllib
        );

        this[URLLIB] = urllib.create({
          agent: new Agent(opts),
          httpsAgent: new HttpsAgent(opts)
        });
      }
    }
    return this[URLLIB];
  }

  async request(url, params) {
    const requestParams = Object.assign(
      { dataType: "json" },
      this.options.requestOpts,
      params
    );

    debug(">>>> url >>>>", url);
    debug(">>>> requestParams >>>>", requestParams);

    const response = await this.urllib.request(url, requestParams);
    const result = response.data;
    if (result) {
      if (result.errcode !== 0) {
        const err = new Error(`${url} got error: ${JSON.stringify(result)}`);
        err.code = result.errcode;
        err.data = result;
        throw err;
      } else {
        return result;
      }
    } else {
      return response;
    }
  }

  async post(api, data, opts = {}) {
    assert(api, "api path required");
    const accessToken = this.options.accessToken;
    const url = `${this.options.host}${api}?access_token=${accessToken}`;
    return await this.request(
      url,
      Object.assign(
        {
          method: "POST",
          contentType: "json",
          data
        },
        opts
      )
    );
  }
};
