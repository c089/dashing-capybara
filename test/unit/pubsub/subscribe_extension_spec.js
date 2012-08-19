var buster = require('buster')
  , storageStub
  , extension
  , existingStoreName = 'known';

  storageStub = {
    exists: function (id) {
      return id === existingStoreName
    }
  };
  extension = require('../../../pubsub/subscribe_extension')({
    storage: storageStub
  });

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
            subscription: '/'+unknownChannel
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
            subscription: '/'+existingStoreName
          };

      extension.incoming(message, callback);

      expect(callback).toHaveBeenCalledOnce();
      expect(callback).toHaveBeenCalledWith(message);
      refute.defined(message.error);
  },
});

