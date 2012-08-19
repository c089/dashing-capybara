module.exports = function(options) {
  var storage = options.storage;
  return {
    /** Reject subscriptions on unknown channels. */
    incoming: function (message, callback) {
      if (message.channel !== '/meta/subscribe') {
        return callback(message);
      }
      var storeName = message.subscription.substring(1);
      if (!storage.exists(storeName)) {
        message.error = 'Unknown store: ' + storeName + '.';
        return callback(message);
      }
      return callback(message);
    }
  }
};
