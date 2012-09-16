var buster = require("buster")
  , validate = require('../../../../lib/data/validate')
  ;

buster.testCase("data format validation", {
  "isValidTimestampFormat": {
    "should return false for invalid input": function () {
      expect(validate.isValidTimestampFormat('invalid')).toBe(false);
    },
    "should return false for undefined": function () {
      expect(validate.isValidTimestampFormat(undefined)).toBe(false);
    },
    "should return false for null": function () {
      expect(validate.isValidTimestampFormat(null)).toBe(false);
    },
    "should return true for valid input": function () {
      expect(validate.isValidTimestampFormat(1)).toBe(true);
    }
  }
});

