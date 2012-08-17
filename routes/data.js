var uuid = require('node-uuid');
module.exports = function(options) {
    var storage = options.storage;
    return {
        create: function (request, response) {
            var id = uuid.v1();
            storage.create(id);
            response.status(201).send({
                id: id
            });
        },

        post_id: function (request, response) {
            var data = request.body;
            storage.add(request.params.id, data);
            response.status(200).send();
        },

        put_id: function (request, response) {
            var data = request.body;
            storage.set(request.params.id, data);
            response.status(200).send();
        },

        get_by_id: function(request, response) {
            response.status(200).send(storage.get(request.params.id));
        }
    };
};
