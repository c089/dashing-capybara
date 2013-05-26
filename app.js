var express = require('express'),
    http = require('http'),
    path = require('path'),
    routes = require('./routes'),
    dataMiddleware = require('./lib/data/middleware'),
    app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express['static'](path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

module.exports = require('./lib/wiring').wireModules(app);

app.put ('/data/*',     dataMiddleware);
app.post('/data/*',     dataMiddleware);

app.post('/data',       module.exports.dataController.create);
app.post('/data/:id',   module.exports.dataController.post_id);
app.put ('/data/:id',   module.exports.dataController.put_id);
app.get ('/data/:id',   module.exports.dataController.get_by_id);

require('./lib/example').setup(app, module.exports.storage);
