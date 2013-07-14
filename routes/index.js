
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'BotWorld' });
};

exports.news = function(req, res){
  res.render('news', { title: 'BotWorld' });
};
