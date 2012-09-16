var addMissingTimestamp = function (dataPoint) {
  // TODO: It seems cleaner to store javascript date objects internally and
  // convert to json when publishing/querying the API instead.
  if (dataPoint.timestamp === undefined) {
    dataPoint.timestamp = new Date().toJSON();
  }
  else {
    dataPoint.timestamp = new Date(dataPoint.timestamp).toJSON();
  }
};

exports.addMissingTimestamps = function (request, response) {
  _.each(request.body, addMissingTimestamp);
};
