var convertmw = require('./convert_single_object_to_array')
  , addTsMw = require('./add_missing_timestamps')
  , validateMw = require('./validate')
  ;

module.exports = function (request, response, next) {
  convertmw.convertSingleObjectToArray(request, response);
  addTsMw.addMissingTimestamps(request, response);
  validateMw.validate(request, response);
  next();
};
