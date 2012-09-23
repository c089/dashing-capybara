var buster = require('buster')
  , DashingCapybaraClient = require('../../../../lib/client')
  , Faye = require('faye')
  ;

buster.testCase("DashingCapybaraClient", {
  "constructor": {
    "should create object": function () {
      var c = new DashingCapybaraClient();
      expect(c instanceof DashingCapybaraClient).toBe(true);
    },
    "should create a faye client": function () {
      var c = new DashingCapybaraClient();
      expect(c._fayeClient).not.toBe(undefined);
      expect(c._fayeClient instanceof Faye.Client).toBe(true);
    },
    "should subscribe to private channel": function (done) {
      var _subscribeToPrivateChannelStub = this.stub(
        DashingCapybaraClient.prototype,
        '_subscribeToPrivateChannel',
        function () {}
      );
      this.stub(Faye.Client.prototype, 'connect', function (d) { d(); });
      var c = new DashingCapybaraClient('http://localhost:123', function () {
        expect(_subscribeToPrivateChannelStub).toHaveBeenCalledOnceWith(undefined);
        done();
      });
    }
  },

  "subscribe": {
    "should add handler function": function () {
      var c = new DashingCapybaraClient()
        , storeId = 'foo'
        , handler = this.spy()
        ;

      c.subscribe(storeId, handler);
      expect(c._dataHandlers[storeId]).toBe(handler);
    },

    "should subscribe to faye client with correct channel": function () {
      var c = new DashingCapybaraClient()
        , storeId = 'foo'
        , subscribeSpy = this.spy(c._fayeClient, 'subscribe')
        , expectedChannel = '/data/' + storeId;// TODO: util for chan name
        ;

      c.subscribe(storeId, function () {});
      expect(subscribeSpy).toHaveBeenCalledOnceWith(expectedChannel);
    }
  },

  "_subscribeToPrivateChannel": {
    "should subscribe to private channel": function () {
      var c = new DashingCapybaraClient()
        , fayeClient = c._fayeClient
        , spy = this.spy(fayeClient, 'subscribe')
        , expectedChannel = '/private/' + fayeClient.getClientId() //TODO util
        ;
      c._subscribeToPrivateChannel();
      expect(spy).toHaveBeenCalledOnceWith(expectedChannel);
    }
  },

  "_handleData": {
    "should call handler function for specific store": function () {
      var c = new DashingCapybaraClient()
        , storeId = 'x'
        , data = { storeId: storeId, values: [] }
        , toBeCalled = this.spy()
        , notToBeCalled = this.spy()
        ;
      // Given data handlers for this store and another one
      c._dataHandlers[storeId] = toBeCalled;
      c._dataHandlers['otherStoreId'] = notToBeCalled;

      // When private data for the store comes in
      c._handleData(data);

      // Then only the correct handler is called
      expect(toBeCalled).toHaveBeenCalledOnceWith(data.data);
      expect(notToBeCalled).not.toHaveBeenCalled();
    }
  },

});

