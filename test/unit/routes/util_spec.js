var buster = require("buster")
  , util = require('../../../routes/util')
  ;

buster.testCase("routes utils", {
  "checkOrAddTimestamp should add a timestamp if it's missing": function () {
    // given a value without a timestamp
    var result = util.checkOrAddTimestamp({value: "v"});
    // the timestamp should be added
    expect(result.timestamp).toBeDefined();
    // and it should be in json format
    expect(new Date(result.timestamp).toJSON()).toEqual(result.timestamp);
  },

  "checkOrAddTimestamp should convert to iso format": function () {
    var input = { value: "v", timestamp: 'Sep 15, 2012 14:30' }
      , expected = new Date(input.timestamp).toJSON()
      , result = util.checkOrAddTimestamp(input)
      ;
    expect(result.timestamp).toBe(expected);
  },

  "checkOrAddTimestamp should throw on invalid timestamp": function () {
    // Given a value with an invalid timestamp
    var input = { value: "v", timestamp: 'foo' };
    expect(function () { util.checkOrAddTimestamp(input) }).toThrow();
  }
});

