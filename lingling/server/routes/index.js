const checkNotLogin = require('../middlewares/check').checkNotLogin

module.exports = function(app) {

	/* GET home page. */
	app.get('/', checkNotLogin, function(req, res, next) {
		// res.render('index', { title: 'Express' });
		// res.send('hello world')
		res.json({ title: 'express', welcome: 'welcome to express!' });
	});

	app.use('/users', require('./users'));//用户注册、登录、登出
	app.use('/posts', require('./posts'));//发表、修改、删除文章
	app.use('/comments', require('./comments'));//发表、删除留言
	app.use('/calls', require('./calls'));//打call专用路由
}
