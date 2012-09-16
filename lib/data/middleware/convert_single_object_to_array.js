var _ = require('underscore');

exports.convertSingleObjectToArray = function (request, response) {
  if (!_.isArray(request.body)) {
    request.body = [request.body];
  }
};
