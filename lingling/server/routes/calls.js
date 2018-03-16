/**
 * 
 * @authors Er_shenger (Just Because)
 * @date    2018-03-14 13:02:25
 * @version $Id$
 */

const express = require('express')
const router = express.Router()

const PostModel = require('../models/posts')
const CallModel = require('../models/calls')
const checkLogin = require('../middlewares/check').checkLogin

router.get('/', function (req, res, next) {
	const postId = req.query.postId
	console.log(postId)
	CallModel.getCallByPostId(postId)
		.then(function (result) {
			// console.log(result)
			res.send(result)
		})
})

router.get('/all', function (req, res, next) {
	CallModel.getCalls()
		.then(function (result) {
			res.send(result)
		})
})

router.post('/addPost', function (req, res, next) {
	const postId = req.body.postId
	const username = req.session.user.username
	console.log(username)

	CallModel.update(postId, { 'username': username })
		.then(function (result) {
			// console.log(result)
			if(result.result.ok == 1) {
				return res.json({ state: 1, msg: '打call成功' })
			}
		})
})

module.exports = router