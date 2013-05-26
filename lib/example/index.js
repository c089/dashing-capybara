var routes = require('../../routes');
function setupExample(app, storage) {
  var exampleStore = 'example';
  if (!storage.exists(exampleStore)) {
    storage.create(exampleStore);
    storage.add(exampleStore, {value: '50'});
  }
  app.get ('/', routes.index);
}

module.exports = {
  setup: setupExample
};
