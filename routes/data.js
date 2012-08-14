var uuid = require('node-uuid');
exports.create = function (request, response) {
    response.status(201).send({
        id: uuid.v1()
    });
};
