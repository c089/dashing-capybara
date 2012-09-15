var verifyTime = function (time) {
  if (isNaN(time.valueOf())) {
    throw new Error(
      "Invalid time format, should be parseable by new Date().");
  }
};

exports.checkOrAddTimestamp = function (value) {
  var givenTime = new Date(value.timestamp);
  if (value.timestamp === undefined) {
    value.timestamp = new Date().toJSON();
  }
  else {
    verifyTime(givenTime);
    value.timestamp = givenTime.toJSON();
  }
  return value;
}
