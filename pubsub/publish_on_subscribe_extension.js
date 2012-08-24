var util = require('./util');

module.exports = function(options) {
  var storage = options.storage
    , pubsub = options.pubsub
    ;
  return {
    incoming: function (message, callback) {
      if (message.channel !== '/meta/subscribe') {
        return callback(message);
      }

      var storeName = util.storeNameFromChannel(message.subscription);
      if (storage.exists(storeName)) {
        pubsub.publishPrivate(message.clientId, storeName);
      }

      callback(message);
    }
  };
};

