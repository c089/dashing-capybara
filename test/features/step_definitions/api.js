require('chai').should();
module.exports = function () {
  this.World = require('../support/world.js').World;

  this.When(/^I POST to (.*) with empty body/, function(url, callback) {
    this.post(url, undefined, callback);
  });

  this.When(/^I POST to (.*) with body (.*)/, function(url, body, callback) {
    this.post(url, body, callback);
  });

  this.When(/^I PUT to (.*) with body (.*)$/, function(url, body,  callback) {
    this.put(url, body, callback);
  });

  this.Then(/^the status should be (\d+)$/, function(expectedStatus, done) {
    this.httpResponse.statusCode.should.equal(parseInt(expectedStatus));
    done();
  });

  this.Then(/^the result should include an id$/, function(callback) {
    var parsedResponse = JSON.parse(this.responseData)
      , re = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
    parsedResponse.should.be.an('object');
    parsedResponse.should.have.keys('id');
    parsedResponse.id.should.match(re);
    callback();
  });

  this.Given(/^an existing data store with id (\d+)$/, function(id, cb) {
    this.app.storage.create(id);
    cb();
  });

  this.Given(/^an existing data store with id (\d+) and data (.+)$/, function(id, data, cb) {
    this.app.storage.create(id);
    this.app.storage.set(id, JSON.parse(data));
    cb();
  });

  this.When(/^I GET (.*)$/, function(url, callback) {
    this.get(url, callback);
  });

  this.Then(/^the result should be a single data point$/, function(callback) {
    var parsedResponse = JSON.parse(this.responseData);
    parsedResponse.length.should.equal(1)
    callback();
  });

  this.Then(/^the result should have size (\d+)$/, function(size, cb) {
    JSON.parse(this.responseData).should.have.length(size);
    cb();
  });

  this.Then(/^the result should contain (.*)$/, function(expected, cb) {
    var expectedObject = JSON.parse(expected);
    this.responseContainsObject(expectedObject).should.be.true;
    cb();
  });

  this.Then(/^the result should not contain (.*)$/, function(unexpected, cb) {
    var unexpectedObject = JSON.parse(unexpected);
    this.responseContainsObject(unexpectedObject).should.be.false;
    cb();
  });


};
