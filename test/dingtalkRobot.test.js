'use strict';

const assert = require('assert');
const request = require('supertest');
const mm = require('egg-mock');

describe('test/dingtalkRobot.test.js', () => {
  describe('single robot', () => {
    let app;

    before(function* () {
      app = mm.app({
        baseDir: 'robot',
      });
      yield app.ready();
    });

    afterEach(mm.restore);

    it('app.dingtalkRobot', function* () {
      assert(app.dingtalkRobot);
    });

    it('should sendText success', function(done) {
      request(app.callback())
        .get('/sendText')
        .expect(200)
        .end(done);
    });

    it('should sendTextAt success', function(done) {
      request(app.callback())
        .get('/sendTextAt')
        .expect(200)
        .end(done);
    });

    it('should sendTextAtAll success', function(done) {
      request(app.callback())
        .get('/sendTextAtAll')
        .expect(200)
        .end(done);
    });

    it('should sendLink success', function(done) {
      request(app.callback())
        .get('/sendLink')
        .expect(200)
        .end(done);
    });

    it('should sendMarkdown success', function(done) {
      request(app.callback())
        .get('/sendMarkdown')
        .expect(200)
        .end(done);
    });

    it('should error is at mobiles more than maxAtCount', function(done) {
      request(app.callback())
        .get('/overMaxAtCount')
        .expect(500)
        .end(done);
    });
  });

  describe('multiple robot', () => {
    let app;

    before(async function() {
      app = mm.app({
        baseDir: 'robot-multiple',
      });
      await app.ready();
    });

    afterEach(mm.restore);

    it('should multi sendText success', function(done) {
      request(app.callback())
        .get('/multi/sendText')
        .expect(200)
        .end(done);
    });

    it('should multi sendLink success', function(done) {
      request(app.callback())
        .get('/multi/sendLink')
        .expect(200)
        .end(done);
    });
  });
});
