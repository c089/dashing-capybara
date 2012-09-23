var Faye = require('faye')
  , DashingCapybaraClient;

DashingCapybaraClient = function () {
  this._fayeClient = new Faye.Client();
  this._subscribeToPrivateChannel();
  this._dataHandlers = {};
};

DashingCapybaraClient.prototype.subscribe = function (storeId, dataHandler) {
  this._dataHandlers[storeId] = dataHandler;
  this._fayeClient.subscribe('/data/' + storeId, this._handleData);
};

DashingCapybaraClient.prototype._subscribeToPrivateChannel = function () {
  var channel = '/private/' + this._fayeClient.getClientId(); // TODO util
  this._fayeClient.subscribe(channel, this._handleData);
};

DashingCapybaraClient.prototype._handleData = function (data) {
  this._dataHandlers[data.storeId](data.data);
};

module.exports = DashingCapybaraClient;
