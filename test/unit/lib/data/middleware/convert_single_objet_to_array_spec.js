var _ = require('underscore')
  , buster = require('buster')
  , path = '../../../../../lib/data/middleware/convert_single_object_to_array'
  , convertSingleObjectToArray = require(path).convertSingleObjectToArray
  , request
  , response
  ;

buster.testCase("convert single object to array middleware", {
  setUp: function () {
    request = {};
    response = {
      json: this.spy(),
    };
  },

  "should wrap single object in an array": function () {
    request.body = {value: "v"};
    convertSingleObjectToArray(request, response);
    expect(_.isArray(request.body)).toBe(true);
  },

  "should not wrap incoming arrays": function () {
    request.body = [{value: "v"}];
    convertSingleObjectToArray(request, response);
    expect(_.isArray(request.body[0])).toBe(false);
    expect(_.isObject(request.body[0])).toBe(true);
  },
});


