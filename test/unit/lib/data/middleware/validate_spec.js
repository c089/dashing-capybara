var buster = require("buster")
  , validate = require('../../../../../lib/data/middleware/validate').validate
  , request
  , response
  , nextCallback
  ;

buster.testCase("data format validation middleware", {
  setUp: function () {
    request = {};
    response = {
      json: this.spy(),
    };
    nextCallback = this.spy();
  },

  "should proceed for valid input": function () {
    request.body = [{value: "v", timestamp: 1}];
    validate(request, response, nextCallback);
    // checking call for next() with calledWith(undefined)
    expect(nextCallback).toHaveBeenCalledOnceWith(undefined);
  },

  "should return 400 for invalid timestamp": function () {
    var expectedError = {
      error: "Invalid timestamp format: X, should be parseable by new Date()"
    };
    request.body = [{value: "V", timestamp: "X"}];
    validate(request, response, this.spy());
    expect(response.json).toHaveBeenCalledOnce();
    expect(response.json).toHaveBeenCalledWith(400, expectedError);
  },

  "should return 400 for missing value": function () {
    var expectedError = {
      error: 'Missing "value" in data point.'
    };
    request.body = [{timestamp: 1}];
    validate(request, response, this.spy());
    expect(response.json).toHaveBeenCalledOnce();
    expect(response.json).toHaveBeenCalledWith(400, expectedError);
  }
});
