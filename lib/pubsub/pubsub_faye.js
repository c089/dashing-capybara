var faye = require('faye')
  , util = require('./util')
;
module.exports = function(options) {
  var storage = options.storage
    , httpServer = options.httpServer
    , bayeux = new faye.NodeAdapter({mount: '/faye', timeout: 45})
    , bayeuxClient
    , subscribe_extension = require('./subscribe_extension')({
        storage: options.storage
      })
    , getData = function getData (storeId) {
        return { storeId: storeId, data: storage.get(storeId) };
      }
    , fns = {
        /** Publish data to all clients subscribed to the store. */
        publish: function (id) {
          bayeuxClient.publish(util.storeChannelFor(id), getData(id));
        },

        /** Publish data to a single client. */
        publishPrivate: function(clientId, storeId) {
          var data = getData(storeId);
          bayeuxClient.publish(util.privateChannelFor(clientId), data);
        }
      }
  ;

  var publish_on_subscribe_extension = require('./publish_on_subscribe_extension')({
    storage: options.storage,
    pubsub: fns
  });

  bayeux.addExtension(subscribe_extension);
  bayeux.addExtension(publish_on_subscribe_extension);
  bayeux.attach(httpServer);
  bayeuxClient = bayeux.getClient();

  return fns;
};
