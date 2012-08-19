module.exports = function () {
  this.World = require('../support/world.js').World;

  this.When(/^I subscribe to (.+)$/, function(id, done) {
    var world = this;
    world.messages = [];
    world.subscription = this.fayeClient.subscribe('/' + id, function (m) {
      world.messages.push(m);
    });
    world.subscription.callback(function () {
      world.subscribed = true;
      done();
    });
    world.subscription.errback(function (error) {
      world.subscribed = false;
      world.subscriptionError = error;
      done();
    });
  });

  this.Then(/^I am subscribed$/, function(callback) {
    this.subscribed.should.be.true
    callback()
  });

  this.Then(/^I receive an error: "([^"]*)"$/, function(error, callback) {
    this.subscriptionError.message.should.equal(error);
    callback();
  });

  this.Then(/^I receive a message containing (.+)$/, function(data, done) {
    var world = this;
    setTimeout(function () {
      world.messages.length.should.equal(1);
      world.messages[0][0].should.deep.equal(JSON.parse(data));
      done();
    }, 50);
  });

};
