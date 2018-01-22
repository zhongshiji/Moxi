module.exports = function(app) {

	/* GET home page. */
	app.get('/', function(req, res, next) {
		// res.render('index', { title: 'Express' });
		// res.send('hello world')
		res.json({ title: 'express', welcome: 'welcome to express!' });
		const wel = req.query.ID
		console.log(wel)
	});

	app.use('/users', require('./users'));

}
