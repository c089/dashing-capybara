var faye = require('faye');
module.exports = function(options) {
  var storage = options.storage
    , httpServer = options.httpServer
    , bayeux = new faye.NodeAdapter({mount: '/faye', timeout: 45})
    , subscribe_extension = require('./subscribe_extension')({
        storage: options.storage
      })
    , bayeuxClient;

  bayeux.addExtension(subscribe_extension);
  bayeux.attach(httpServer);
  bayeuxClient = bayeux.getClient();

  return {
    publish: function (id) {
      bayeuxClient.publish('/' + id, storage.get(id));
    }
  }
};
