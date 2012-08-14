require('chai').should();
module.exports = function () {
    var httpResponse,
        responseData = '';

    this.When(/^I POST to (.*)/, function(url, callback) {
        var http = require('http'),
            request = http.request({
              host: 'localhost',
              port: 3000,
              method: 'POST',
              path: url
          }, function (response) {
              httpResponse = response;
              response.on('data', function(chunk) {
                  responseData += chunk;
              });
              response.on('end', function () {
                  callback();
              });
          }).end();
      });

    this.Then(/^the status should be (\d+)$/, function(expectedStatus, callback) {
        httpResponse.statusCode.should.equal(parseInt(expectedStatus));
        callback();
    });

    this.Then(/^the result should include an id$/, function(callback) {
        var parsedResponse = JSON.parse(responseData),
            re = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
        parsedResponse.should.be.an('object');
        parsedResponse.should.have.keys('id');
        parsedResponse.id.should.match(re);
        callback();
    });

};
