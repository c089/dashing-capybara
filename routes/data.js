var uuid = require('node-uuid');
module.exports = function(options) {
  var storage = options.storage
    , publish = options.publish
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
      storage.add(id, data);
      publish(id);
      response.status(200).send();
    },

    put_id: function (request, response) {
      var data = request.body
        , id = request.params.id;
      storage.set(request.params.id, data);
      publish(id);
      response.status(200).send();
    },

    get_by_id: function(request, response) {
      response.status(200).send(storage.get(request.params.id));
    }
  };
};
