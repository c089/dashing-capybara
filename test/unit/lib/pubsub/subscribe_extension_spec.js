var buster = require('buster')
  , storageStub
  , extension
  , existingStoreName = 'known';

  storageStub = {
    exists: function (id) {
      return id === existingStoreName
    }
  };
  extension = require('../../../../lib/pubsub/subscribe_extension')({
    storage: storageStub
  });
  util = require('../../../../lib/pubsub/util');

buster.testCase("subscribe extension", {
  'it should pass through messages on non-subscribe channel': function () {
      var callback = this.spy()
        , message = this.spy();

      extension.incoming(message, callback);

      expect(callback).toHaveBeenCalledOnce();
      expect(callback).toHaveBeenCalledWith(message);
      refute.defined(message.error);
  },

  'it should refuse to subscribe to unknown stores': function () {
      var callback = this.spy()
        , unknownChannel = 'unknown'
        , message = {
            channel: '/meta/subscribe',
            subscription: util.storeChannelFor(unknownChannel)
          };

      extension.incoming(message, callback);

      expect(callback).toHaveBeenCalledOnce();
      expect(callback).toHaveBeenCalledWith(message);
      expect(message.error).toBe('Unknown store: ' + unknownChannel + '.');
  },

  'it should accept subscriptions to known stores': function () {
      var callback = this.spy()
        , message = {
            channel: '/meta/subscribe',
            subscription: util.storeChannelFor(existingStoreName)
          };

      extension.incoming(message, callback);

      expect(callback).toHaveBeenCalledOnce();
      expect(callback).toHaveBeenCalledWith(message);
      refute.defined(message.error);
  },

  'it should pass through subscription for non-data channels': function () {
      var callback = this.spy()
        , message = {
           channel: '/meta/subscribe',
           subscription: util.privateChannelFor('123')
        }

      extension.incoming(message, callback);

      expect(callback).toHaveBeenCalledOnce();
      expect(callback).toHaveBeenCalledWith(message);
      refute.defined(message.error);
  }
});

