exports.index = function(req, res){
  var baseUrl = 'http://' + req.header('host');
  res.render('index', {
    title: 'Dashing Capybara',
    baseUrl: baseUrl,
    exampleApiUrl: baseUrl + '/data/index'
  });
};
