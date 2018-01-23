// const path = require('path');
var express = require('express');
var router = express.Router();

const UserModel = require('../models/users')
const checkLogin = require('../middlewares/check').checkLogin
const checkNotLogin = require('../middlewares/check').checkNotLogin

/* GET users listing. */
router.get('/', checkNotLogin, function(req, res, next) {
	res.send('respond with a resource');
	console.log("hello lingling!");
});

router.post('/signup', checkNotLogin, function(req, res, next) {
	const username = req.body.username
	let password = req.body.password

	//校验参数
	try {
		if (!(username.length >= 1 && username.length <= 12)) {
			throw new Error('用户名请限制在 1-12 个字符')
		}
		if (password.length < 6) {
			throw new Error('密码至少 6 个字符')
		}
	} catch (e) {
		return res.send(e.message);
	}

	console.log(username, password);

	//待写入数据库的用户信息
	let user = {
		username: username,
		password: password
	}

	//用户信息写入数据库
	UserModel.create(user)
		.then(function(result) {
			//此 user 是插入 mongodb后的值，包含_id
			user = result.ops[0]
			console.log('注册成功')
			res.json({ signupcode: 1 })
		})
		.catch(function(e) {
			if (e.message.match('duplicate key')) {
				console.log('用户注册的账号已被占用')
				return res.json({ signupcode: 0 })
			}
			next(e)
		})
});

router.post('/signin', checkNotLogin, function(req, res, next) {
	const username = req.body.username;
	const password = req.body.password;

	//校验参数
	try {
		if (!username.length) {
			throw new Error('请填写账号');
		}
		if (!password.length) {
			throw new Error('请填写密码');
		}
	} catch (e) {
		return res.send(e.message);
	}

	UserModel.getUserByName(username)
		.then(function(user) {
			if (!user) {
				return res.send('用户不存在')
			}
			//检查密码是否匹配
			if(password !== user.password) {
				return res.send('账号或密码错误')
			}
			// //用户信息写入session
			// delete user.password
			// req.session.user = user
			return res.json({ signinCode: 1 })
		})
		.catch(next)
})
module.exports = router;
