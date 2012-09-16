var _           = require('underscore')
  , uuid        = require('node-uuid')

module.exports = function(options) {
  var storage = options.storage
    , publish = options.publish
    , addItem = function (id, item) {
        storage.add(id, item);
      }
    , addItems = function (id, items) {
        _.each(items, function (value) {
          addItem(id, value);
        });
      }
    ;
  return {
    create: function (request, response) {
      var id = uuid.v1();
      storage.create(id);
      response.status(201).send({
        id: id
      });
    },

    post_id: function (request, response) {
      var data = request.body
        , id = request.params.id;
      addItems(id, data);
      publish(id);
      response.status(200).send();
    },

    put_id: function (request, response) {
      var data = request.body
        , id = request.params.id;
      storage.set(request.params.id, []);
      addItems(id, data);
      publish(id);
      response.status(200).send();
    },

    get_by_id: function(request, response) {
      response.status(200).send(storage.get(request.params.id));
    }
  };
};
