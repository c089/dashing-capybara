exports.World = function World(callback) {
    this.request = function(method, url, body, done) {
        var world = this,
            http = require('http'),
            headers,
            request;

        if (body) {
            headers = { 'Content-Type': 'application/json' }
        }

        request = http.request({
          host: 'localhost',
          port: 3000,
          method: method,
          path: url,
          headers: headers
        });

        request.on('response', function (response) {
              world.httpResponse = response;
              world.responseData = '';

              response.on('data', function(chunk) {
                  world.responseData += chunk;
              });
              response.on('end', function () {
                  done();
              });
        });
        if (body !== undefined) {
            request.write(body);
        }
        request.end();
    };
    this.get = function(url, done) {
        this.request('GET', url, undefined, done);
    };
    this.post = function(url, body, done) {
        this.request('POST', url, body, done);
    };

    callback();
};
