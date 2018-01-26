const checkNotLogin = require('../middlewares/check').checkNotLogin

module.exports = function(app) {

	/* GET home page. */
	app.get('/', checkNotLogin, function(req, res, next) {
		// res.render('index', { title: 'Express' });
		// res.send('hello world')
		res.json({ title: 'express', welcome: 'welcome to express!' });
	});

	app.use('/users', require('./users'));
	// app.use();
	// app.use();

}
