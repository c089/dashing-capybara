var buster = require('buster')
  , util = require('../../../../lib/pubsub/util');

buster.testCase('utils', {
  'it should properly format the store endpoint': function () {
    expect(util.storeChannelFor('123')).toBe('/data/123');
  },

  'it should parse the store name from the data channel': function () {
    expect(util.storeNameFromChannel('/data/123')).toBe('123');
  },

  'it should properly format the private channel endpoint': function () {
    expect(util.privateChannelFor('123')).toBe('/private/123');
  },

});


