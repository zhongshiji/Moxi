// const path = require('path');
var express = require('express');
var router = express.Router();

const UserModel = require('../models/users')
const UserInfo = require('../models/userinfos')
const checkLogin = require('../middlewares/check').checkLogin
const checkNotLogin = require('../middlewares/check').checkNotLogin

/* GET users listing. */
router.get('/', checkLogin, function(req, res, next) {
	res.send('Welcome to your lingling!');
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

	let userinfo = {
		username: username,
		nickname: null,
		gender: 'x',
		email: null,
		introduction: null
	}

	//用户信息写入数据库
	UserModel.create(user)
		.then(function(result) {
			// user = result.ops[0]//此 user 是插入 mongodb后的值，包含_id
			console.log(result);
			console.log('注册成功')
			UserInfo.create(userinfo);
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
			if (password !== user.password) {
				return res.send('账号或密码错误')
			}
			//用户信息写入session
			delete user.password
			req.session.user = user
			return res.json({ signinCode: 1 })
		})
		.catch(next)
})

router.get('/signout', checkLogin, function(req, res, next) {
	//清空session中用户信息
	req.session.user = null;
	console.log(req.session.user)
	return res.json({ signoutCode: 1 });
})

router.get('/userinfo', checkLogin, function (req, res, next) {
	console.log(req.session.user.username)
	UserInfo.getUserInfoByName(req.session.user.username)
		.then(function (UserInfo) {
			res.send(UserInfo)
		})
})

router.post('/changeinfo', checkLogin, function(req, res, next) {
	console.log(req.body)
	const username = req.body.username
	const nickname = req.body.form.nickname
	const gender = req.body.form.gender
	const email = req.body.form.email
	const introduction = req.body.form.introduction
	// const avatar = req.files.file.path.split(path.sep).pop()

	let userinfo = {
		username: username,
		nickname: nickname,
		gender: gender,
		email: email,
		introduction: introduction
	}

	//用户信息写入数据库
	UserInfo.update(userinfo.username, { 'nickname': userinfo.nickname, 'gender': userinfo.gender, 'email': userinfo.email, 'introduction': userinfo.introduction })
		.then(function(result) {
			return res.json({ infoCode: 1 })
		}).catch(function (e) {
			console.log(e)
		})
})

module.exports = router;
