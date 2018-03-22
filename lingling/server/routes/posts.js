const express = require('express')
const multer = require('multer');
const fs = require('fs');
const router = express.Router()

const PostModel = require('../models/posts')
const FeedbackModel = require('../models/feedbacks')
const checkLogin = require('../middlewares/check').checkLogin

//  static/images/upload/posts/

//设置图片上传目录位置
const upload = multer({
	dest: 'static/images/upload/posts/'
})

router.get('/', function (req, res, next) {
	const author = req.query.author
	PostModel.getPosts(author)
		.then(function (posts) {
			return res.send(posts)
		})
})

router.get('/singlePost', function (req, res, next) {
	const postId = req.query.postId

	Promise.all([
		PostModel.getPostById(postId),
		PostModel.incPv(postId)
	]).then(function (post) {
			// console.log(post[0])
			return res.send(post[0])
		}).catch(next)
})

//获取某一分类博客
router.get('/select', function (req, res, next) {
	const classify = req.query.classify
	PostModel.getPostsByClassify(classify)
		.then(function (posts) {
			return res.send(posts)
		})
})


//通过博客标题获取文章
router.get('/search', function (req, res, next) {
	const search = req.query.search
	console.log(search)
	PostModel.getPostsByTitle(search)
		.then(function (posts) {
			return res.send(posts)
		})
})

//POST /posts/create 发表一篇文章
router.post('/create', checkLogin, function (req, res, next) {
	const author = req.session.user._id
	const username = req.session.user.username
	console.log(typeof username, username)
	const nickname = req.body.nickname
	const title = req.body.title
	const headUrl = req.body.headUrl
	const content = req.body.content
	const classify = req.body.classify
	const imageUrls = req.body.imageUrls
	const markblog = req.body.markblog

	let post = {
		author: author,
		username: username,
		nickname: nickname,
		headUrl: headUrl,
		title: title,
		content: content,
		classify: classify,
		imageUrls: imageUrls,
		markblog: markblog
	}

	PostModel.create(post)
		.then(function (result) {
			console.log(result);
			console.log('发表成功');
			return res.json({ postCode: 1, msg: "发表成功" })
		})
		.catch(function (e) {
			console.log(e)
			return res.json({ postCode: 0, msg: "发表失败，请重试" })
		})
})

router.post('/upload', upload.single('imageUpload'), function (req, res, next) {
	fs.rename(req.file.path, "static/images/upload/posts/" + req.file.originalname, err => {
		if (err) {
			throw err;
			res.json({ state: 0, msg: '图片上传失败，请刷新重试' })
		}
		res.json({ state: 1, msg: '图片上传成功', imageUrl: "static/images/upload/posts/" + req.file.originalname })
	})
})

router.post('/postFeedBack', function (req, res, next) {
	const email = req.body.email
	const questions = req.body.questions
	const suggestions = req.body.suggestions

	let feedback = {
		email: email,
		questions: questions,
		suggestions: suggestions
	}

	FeedbackModel.create(feedback)
		.then(function (result) {
			if (result.result.ok === 1) {
				res.json({ state: 1, msg: '反馈提交成功' })
			} else {
				res.json({ state: 0, msg: '服务器错误，反馈提交失败！' })
			}
		})
})

module.exports = router