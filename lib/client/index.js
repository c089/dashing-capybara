(function (module) {
  var Faye = (typeof window !== 'undefined' && typeof window.Faye == 'object') ? window.Faye : require('faye')
    , DashingCapybaraClient;

  DashingCapybaraClient = function (url, callback) {
    var me = this;
    this._fayeClient = new Faye.Client(url + '/faye');
    this._dataHandlers = {};
    this._fayeClient.connect(function () {
      me._subscribeToPrivateChannel();
      callback();
    });
  };

  DashingCapybaraClient.prototype.subscribe = function (storeId, dataHandler) {
    var me = this;
    me._dataHandlers[storeId] = dataHandler;
    me._subscribe('/data/' + storeId);
  };

  // connect to private channel, this is required to get initial data upon
  // subscribing
  DashingCapybaraClient.prototype._subscribeToPrivateChannel = function () {
    var channel = '/private/' + this._fayeClient.getClientId(); // TODO util
    this._subscribe(channel);
  };

  DashingCapybaraClient.prototype._subscribe = function (channel) {
    var me = this;
    this._fayeClient.subscribe(channel, function (data) { me._handleData.call(me, data) });
  };

  DashingCapybaraClient.prototype._handleData = function (data) {
    this._dataHandlers[data.storeId](data.data);
  };

  module.exports = DashingCapybaraClient;

  if ('undefined' != typeof window) {
    window.DashingCapybaraClient = module.exports;
  }
})('undefined' == typeof module ? {} : module);
