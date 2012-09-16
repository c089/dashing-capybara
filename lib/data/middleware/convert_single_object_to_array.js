var _ = require('underscore');

exports.convertSingleObjectToArray = function (request, response, next) {
  if (!_.isArray(request.body)) {
    request.body = [request.body];
  }
  next();
};
