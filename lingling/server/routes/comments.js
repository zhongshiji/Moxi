/**
 * 
 * @authors Er_shenger (Just Because)
 * @date    2018-03-12 20:49:08
 * @version $Id$
 */

// const path = require('path');
const express = require('express');
const fs = require('fs');
const router = express.Router();

const CommentModel = require('../models/comments')

const checkLogin = require('../middlewares/check').checkLogin
const checkNotLogin = require('../middlewares/check').checkNotLogin

router.post('/create', checkLogin, function (req, res, next) {
	const author = req.session.user.username
	const content = req.body.content
	const postId = req.body.postId
	const authorhead = req.body.authorhead
	const authornick = req.body.authornick

	let comment = {
		author: author,
		content: content,
		postId: postId,
		authorhead: authorhead,
		authornick: authornick
	}

	CommentModel.create(comment)
		.then(function (result) {
			if (result.result.ok == 1) {
				return res.json({ state: 1, msg: '评论发表成功' })
			} else {
				return res.json({ state: 0, msg: '评论发表失败，请重试' })
			}
		})
})

router.get('/getComments', function (req, res, next) {
	const postId = req.query.postId
	CommentModel.getComments(postId)
		.then(function (result) {
			return res.send(result)
		})
})

router.get('/getCommentsCount', function (req, res, next) {
	const postId = req.query.postId
	CommentModel.getCommentsCount(postId)
		.then(function (result) {
			return res.json({ 'commentsCount': result })
		})
})

module.exports = router;