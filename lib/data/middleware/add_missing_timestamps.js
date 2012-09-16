var addMissingTimestamp = function (dataPoint) {
  if (dataPoint.timestamp === undefined) {
    dataPoint.timestamp = new Date()
  }
  else {
    // FIXME: This conversion should not live here, workaround to get tests
    // green and branches merged together for now.
    dataPoint.timestamp = new Date(dataPoint.timestamp).toJSON();
  }
};

exports.addMissingTimestamps = function (request, response, next) {
  _.each(request.body, addMissingTimestamp);
  next();
};
