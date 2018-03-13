const express = require('express')
const router = express.Router()

const PostModel = require('../models/posts')
const checkLogin = require('../middlewares/check').checkLogin

router.get('/', function (req, res, next) {
	const author = req.query.author
	PostModel.getPosts(author)
		.then(function (posts) {
			return res.send(posts)
		})
})

router.get('/singlePost', function (req, res, next) {
	const postId = req.query.postId
	PostModel.getPostById(postId)
		.then(function (post) {
			console.log(post)
			return res.send(post)
		})
})

//POST /posts/create 发表一篇文章
router.post('/create', checkLogin, function (req, res, next) {
	const author = req.session.user._id
	const username = req.session.user.username
	const nickname = req.body.nickname
	const title = req.body.title
	const headUrl = req.body.headUrl
	const content = req.body.content
	const classify = req.body.classify
	const markblog = req.body.markblog

	let post = {
		author: author,
		username: username,
		nickname: nickname,
		headUrl: headUrl,
		title: title,
		content: content,
		classify: classify,
		markblog: markblog
	}

	PostModel.create(post)
		.then(function (result) {
			console.log(result);
			console.log('发表成功');
			return res.json({ postCode: 1 })
		})
		.catch(function (e) {
			console.log(e)
			return res.json({ postCode: 0 })
		})
})

module.exports = router