var express = require('express')
  , http = require('http')
  , path = require('path')
  , routes = require('./routes')
  , dataMiddleware = require('./lib/data/middleware');
  ;

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// HTTPD
var httpServer = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

// Wiring
exports.storage = require('./lib/storage/memory');

var faye_pubsub = require('./lib/pubsub/pubsub_faye')({
  storage: exports.storage,
  httpServer: httpServer
})

var dataController = require('./routes/data')({
  storage: exports.storage,
  publish: faye_pubsub.publish
});

// Set up example data store for the index page
if (!exports.storage.exists('index')) {
    exports.storage.create('index');
    exports.storage.add('index', {value: 'hello world'});
}

// Routing
app.get ('/', routes.index);

app.put ('/data/*',     dataMiddleware.convertSingleObjectToArray);
app.put ('/data/*',     dataMiddleware.addMissingTimestamps);
app.put ('/data/*',     dataMiddleware.validate);
app.post('/data/*',     dataMiddleware.convertSingleObjectToArray);
app.post('/data/*',     dataMiddleware.addMissingTimestamps);
app.post('/data/*',     dataMiddleware.validate);

app.post('/data',       dataController.create);
app.post('/data/:id',   dataController.post_id);
app.put ('/data/:id',   dataController.put_id);
app.get ('/data/:id',   dataController.get_by_id);
