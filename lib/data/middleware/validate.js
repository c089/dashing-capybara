var validate = require('../validate');
exports.validate = function (request, response, next) {
  var error;
  _.each(request.body, function(dataPoint) {
    if (dataPoint.value === undefined) {
      error = 'Missing "value" in data point.';
      response.json(400, {error: error});
      return;
    }
    if (!validate.hasValidTimestampFormat(dataPoint)) {
      error = "Invalid timestamp format: " +
              dataPoint.timestamp +
              ", should be parseable by new Date()";
      response.json(400, {error: error});
      return;
    }
  });
  next();
};
