var buster = require('buster')
  , storageStub = {}
  , pubsubStub = {}
  , extension
  , message;


extension = require('../../../pubsub/publish_on_subscribe_extension')({
  pubsub: pubsubStub,
  storage: storageStub
});

message = {
  channel: '/meta/subscribe',
  clientId: 'cid',
  subscription: '/data/sid'
};

buster.testCase('publish on subscribe', {
  'it should publish to the private channel when there is data': function () {
      var callback = this.spy()
        , data = [{value: 1}];
      storageStub.exists = this.stub().returns(true);
      storageStub.get = this.stub().returns(data);
      pubsubStub.publishPrivate = this.spy();

      extension.incoming(message, callback);

      expect(callback).toHaveBeenCalledOnce();
      expect(callback.getCall(0).args[0].error).toBe(undefined);
      expect(pubsubStub.publishPrivate).toHaveBeenCalledOnce();
      expect(pubsubStub.publishPrivate).toHaveBeenCalledWith('cid', 'sid');
  },

  'it should not publish to the private channel for non-existing stores': function () {
      var callback = this.spy();
      storageStub.exists = this.stub().returns(false);
      pubsubStub.publishPrivate = this.spy();

      extension.incoming(message, callback);

      expect(callback).toHaveBeenCalledOnce();
      expect(callback.getCall(0).args[0].error).toBe(undefined);
      expect(pubsubStub.publishPrivate).not.toHaveBeenCalled();
  }

});
