module.exports = function(app){
	app.get('/', function(req,res){
		res.redirect('/posts')
	})
	app.use('/signup', require('./signup'))//注册页
	app.use('/signin', require('./signin'))//登录页
	app.use('/signout', require('./signout'))//登出页
	app.use('/posts', require('./posts'))//发表、修改、删除文章页
	app.use('/comments', require('./comments'))//创建、删除留言页

	//404 page
	app.use(function (req, res) {
		if (!res.headersSent) {
			res.status(404).render('404')
		}
	})
}