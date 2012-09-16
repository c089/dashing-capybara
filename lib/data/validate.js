var hasValidTimestampFormat = function (dataPoint) {
  return isValidTimestampFormat(dataPoint.timestamp);
};

var isValidTimestampFormat = function (timestamp) {
  return timestamp !== null && !isNaN(new Date(timestamp).valueOf());
};

exports.isValidTimestampFormat = isValidTimestampFormat;
exports.hasValidTimestampFormat = hasValidTimestampFormat;
