exports.index = function(req, res){
  var baseUrl = 'http://' + req.header('host')
    , exampleStoreName = 'example';
  res.render('index', {
    title: 'Dashing Capybara',
    baseUrl: baseUrl,
    exampleStoreName: exampleStoreName,
    exampleApiUrl: baseUrl + '/data/' + exampleStoreName
  });
};
