const path = require('path')
const express = require('express')
const session = require('express-session')
//将 session 存储于 mongodb，结合 express-session 使用
const MongoStore = require('connect-mongo')(session)
//页面通知的中间件，基于 session 实现
const flash = require('connect-flash')
//读取配置文件
const config = require('config-lite')(__dirname)
const exFormidable = require('express-formidable')
const routes = require('./routes')
const pkg = require('./package')

const app = express()

//设置存放模板文件的目录
app.set('views', path.join(__dirname, 'views'))
//设置模板引擎为ejs
app.set('view engine', 'ejs')

//设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')))
//session中间件
app.use(session({
	name: config.session.key,//设置cookie中保存session id的字段名称
	secret: config.session.secret,//通过设置secret来计算hash值并放在cookie中，使产生的signedCookie防篡改
	resave: true,//强制更新session
	saveUninitialized: false,//设置为false，强制创建一个session，即使用户未登录
	cookie: {
		maxAge: config.session.maxAge//过期时间，过期后cookie中的session id自动删除
	},
	store: new MongoStore({//将session存储到mongodb
	  url: config.mongodb//mongodb地址
	})
}))
//flash中间件，用来显示通知
app.use(flash())

//处理表单及文件上传的中间件
app.use(exFormidable({
	uploadDir: path.join(__dirname, 'public/img'),// 上传文件目录
	keepExtensions: true// 保留后缀
}))

//设置模板全局变量
app.locals.blog = {
	title: pkg.name,
	description: pkg.description
}

//添加模板必须的三个变量
app.use(function(req, res, next){
	res.locals.user = req.session.user
	res.locals.success = req.flash('success').toString()
	res.locals.error = req.flash('error').toString()
	next()
})

//路由
routes(app)

app.listen(config.port, function(){
	console.log(`${pkg.name} listening on port ${config.port}`)
})