var faye = require('faye')
  , http = require('http')
  , util = require('../../../lib/pubsub/util')
  ;

exports.World = function World(callback) {
    this.app = require('../../../app');
    this.app.storage.clear();

    this.fayeClient = new faye.Client('http://localhost:3000/faye');

    this.messages = [];

    this.request = function(method, url, body, done) {
        var world = this,
            headers,
            request;

        if (body) {
            headers = { 'Content-Type': 'application/json' }
        }

        request = http.request({
          host: 'localhost',
          port: 3000,
          method: method,
          path: url,
          headers: headers
        });

        request.on('response', function (response) {
              world.httpResponse = response;
              world.responseData = '';

              response.on('data', function(chunk) {
                  world.responseData += chunk;
              });
              response.on('end', function () {
                  done();
              });
        });
        if (body !== undefined) {
            request.write(body);
        }
        request.end();
    };

    this.get = function(url, done) {
        this.request('GET', url, undefined, done);
    };

    this.post = function(url, body, done) {
        this.request('POST', url, body, done);
    };

    this.put = function(url, body, done) {
        this.request('PUT', url, body, done);
    };

    this.responseContainsObject = function (expectedObject) {
        return _.any(JSON.parse(this.responseData), function (value) {
            return _.isEqual(expectedObject, value);
        });
    }

    this.responseContainsValue = function (expectedValue) {
      return _.any(JSON.parse(this.responseData), function (item) {
        return item.value === expectedValue;
      });
    };

    callback();
};
