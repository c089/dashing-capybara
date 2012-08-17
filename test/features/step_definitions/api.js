var app = require('../../../app');
require('chai').should();
module.exports = function () {
    var httpResponse,
        responseData,
        headers,
        request = function(method, url, body, done) {
            var http = require('http'),
                headers,
                request;

            responseData = '';

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
                  httpResponse = response;
                  response.on('data', function(chunk) {
                      responseData += chunk;
                  });
                  response.on('end', function () {
                      done();
                  });
            });
            if (body !== undefined) {
                request.write(body);
            }
            request.end();
        },
        get = function(url, done) {
            request('GET', url, undefined, done);
        };
        post = function(url, body, done) {
            request('POST', url, body, done);
        };

    this.When(/^I POST to (.*) with empty body/, function(url, callback) {
        post(url, undefined, callback);
    });

    this.When(/^I POST to (.*) with body (.*)/, function(url, body, callback) {
        post(url, body, callback);
      });

    this.Then(/^the status should be (\d+)$/, function(expectedStatus, done) {
        httpResponse.statusCode.should.equal(parseInt(expectedStatus));
        done();
    });

    this.Then(/^the result should include an id$/, function(callback) {
        var parsedResponse = JSON.parse(responseData),
            re = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
        parsedResponse.should.be.an('object');
        parsedResponse.should.have.keys('id');
        parsedResponse.id.should.match(re);
        callback();
    });

    this.Given(/^an existing data store with id (\d+)$/, function(id, cb) {
        app.storage.create(id);
        cb();
    });

    this.When(/^I GET (.*)$/, function(url, callback) {
        get(url, callback);
    });

    this.Then(/^the result should be a single data point$/, function(callback) {
        var parsedResponse = JSON.parse(responseData);
        parsedResponse.length.should.equal(1)
        callback();
    });

    this.Then(/^the first data point should contain (.*)$/, function(x, cb) {
        var result = JSON.parse(responseData),
            expected = JSON.parse(x);
        result[0].should.deep.equal(expected);
        cb();
    });

};
