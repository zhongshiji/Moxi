// const path = require('path');
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const router = express.Router();

const UserModel = require('../models/users')
const UserInfo = require('../models/userinfos')
const PostModel = require('../models/posts')
const CommentModel = require('../models/comments')
const checkLogin = require('../middlewares/check').checkLogin
const checkNotLogin = require('../middlewares/check').checkNotLogin

//设置头像图片上传目录位置
const upload = multer({
	dest: 'static/images/upload/'
})

/* GET users listing. */
router.get('/', checkLogin, function(req, res, next) {
	res.send('Welcome to your lingling!');
});

router.post('/signup', checkNotLogin, function(req, res, next) {
	const username = req.body.username
	let password = req.body.password

	const myReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;

	//校验参数
	try {
		if (!myReg.test(username)) {
			throw new Error('邮箱格式不对')
		}
		if (password.length < 6) {
			throw new Error('密码至少 6 个字符')
		}
	} catch (e) {
		return res.send(e.message);
	}

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
		headUrl: null,
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
				console.log('用户注册的邮箱已被占用')
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
			return res.json({ signinCode: 1, user: user })
		})
		.catch(next)
})

router.get('/signout', checkLogin, function(req, res, next) {
	//清空session中用户信息
	req.session.user = null;
	return res.json({ signoutCode: 1 });
})

router.get('/userinfo', function (req, res, next) {
	UserInfo.getUserInfoByName(req.session.user.username)
		.then(function (UserInfo) {
			res.send(UserInfo)
		})
})

router.get('/userinfoB', function (req, res, next) {
	const username = req.query.username
	UserInfo.getUserInfoByName(username)
		.then(function (UserInfo) {
			res.send(UserInfo)
		})
})

router.post('/changeinfo', checkLogin, function(req, res, next) {
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
			PostModel.update(req.session.user.username, { 'nickname': userinfo.nickname })
			CommentModel.update(req.session.user.username, { 'authornick': userinfo.nickname })
			return res.json({ infoCode: 1 })
		}).catch(function (e) {
			console.log(e)
		})
})

router.post('/upload', upload.single('avatarUpload'), function (req, res, next) {
	fs.rename(req.file.path, "static/images/upload/" + req.file.originalname, err => {
		if (err) {
			throw err;
			res.json({ state: 0, msg: '图片上传失败，请刷新重试' })
		}
		res.json({ state: 1, msg: '图片上传成功', headUrl: "static/images/upload/" + req.file.originalname })
	})
})

router.post('/changeAvatar', function (req, res) {
	UserInfo.update(req.session.user.username, { 'headUrl': req.body.headUrl })
		.then(function (result) {
			if (result.result.ok == 1 ) {
				PostModel.update(req.session.user.username, { 'headUrl': req.body.headUrl })
				CommentModel.update(req.session.user.username, { 'authorhead': req.body.headUrl })
				res.json({ state: 1, msg: '图片上传成功' })
			} else {
				res.json({ state: 0, msg: '图片上传失败' })
			}
		})
})

module.exports = router;
