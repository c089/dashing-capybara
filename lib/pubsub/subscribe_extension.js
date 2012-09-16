var util = require('./util')
  _  = require('underscore');
  _.str = require('underscore.string')
;
_.mixin(_.str.exports());

module.exports = function(options) {
  var storage = options.storage;
  return {
    /** Reject subscriptions on unknown channels. */
    incoming: function (message, callback) {
      if (message.channel !== '/meta/subscribe') {
        return callback(message);
      }

      if (!(_(message.subscription).startsWith(util.dataEndpoint))) {
          return callback(message);
      }

      var storeName = util.storeNameFromChannel(message.subscription);
      if (!storage.exists(storeName)) {
        message.error = 'Unknown store: ' + storeName + '.';
        return callback(message);
      }
      return callback(message);
    }
  }
};
