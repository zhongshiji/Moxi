var express = require('express');
var path = require('path');
// const session = require('express-session')
// //将 session 存储于 mongodb，结合 express-session 使用
// const MongoStore = require('connect-mongo')(session)
// // var favicon = require('serve-favicon');
//读取配置文件
const config = require('config-lite')(__dirname)
// const pkg = require('./package')
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session中间件
// app.use(session({
// 	name: config.session.key,//设置cookie中保存session id的字段名称
// 	secret: config.session.secret,//通过设置secret来计算hash值并放在cookie中，使产生的signedCookie防篡改
// 	resave: true,//强制更新session
// 	saveUninitialized: false,//设置为false，强制创建一个session，即使用户未登录
// 	cookie: {
// 		maxAge: config.session.maxAge//过期时间，过期后cookie中的session id自动删除
// 	},
// 	store: new MongoStore({//将session存储到mongodb
// 	  url: config.mongodb//mongodb地址
// 	})
// }))

routes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
