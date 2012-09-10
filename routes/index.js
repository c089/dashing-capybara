exports.index = function(req, res){
  res.render('index', {
    title: 'Dashing Capybara',
    baseUrl: 'http://' + req.header('host')
  });
};
