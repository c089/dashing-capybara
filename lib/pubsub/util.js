exports.dataEndpoint = '/data/';

exports.storeChannelFor = function (storeId) {
  return exports.dataEndpoint + storeId;
};

exports.privateChannelFor = function (clientId) {
  return '/private/' + clientId;
};

exports.storeNameFromChannel = function (channel) {
    return channel.split('data/')[1];
};
