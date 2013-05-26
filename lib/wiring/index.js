var http = require('http');
function wireModules (app) {
  var storage,
      faye_pubsub,
      dataController,
      httpServer;

  httpServer = http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
  });

  storage = require('../storage/memory');

  faye_pubsub = require('../pubsub/pubsub_faye')({
    storage: storage,
    httpServer: httpServer
  });

  dataController = require('../../routes/data')({
    storage: storage,
    publish: faye_pubsub.publish
  });

  return {
    dataController: dataController,
    storage: storage
  };
}

module.exports = {
  wireModules: wireModules
};
