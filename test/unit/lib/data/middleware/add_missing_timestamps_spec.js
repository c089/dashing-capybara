var buster = require('buster')
  , path = '../../../../../lib/data/middleware/add_missing_timestamps'
  , addMissingTimestamps = require(path).addMissingTimestamps
  , request
  , response
  ;

buster.testCase("add missing timestamps middleware", {
  setUp: function () {
    request = {};
    response = {
      json: this.spy(),
    };
  },

  "should add timestamps": function () {
    request.body = [{value: "v"}];
    addMissingTimestamps(request, response);
    expect(request.body[0].timestamp).toBeDefined();
  },

  "should not modify existing timestamps": function () {
    var existingTimestamp = "2012-09-15T17:06:15.000Z";
    request.body = [{value: "v", timestamp: existingTimestamp}];
    addMissingTimestamps(request, response);
    expect(request.body[0].timestamp).toBe(existingTimestamp);
  }

});

