/**
 * 
 * @authors Er_shenger (Just Because)
 * @date    2018-03-14 12:57:16
 * @version $Id$
 */

const Call = require('../lib/mongo').Call

module.exports = {
	//创建一条新call
	update: function update(postId, data) {
		return Call.update({ postId: postId }, { $push: data }, { upsert: true }).exec()
	},

	//根据文章id查找call
	getCallByPostId: function getCallByPostId(postId) {
		const query = {}
		query.postId = postId
		return Call.find(query).exec()
	},

	//获得所有call
	getCalls: function getCalls() {
		const query = {}
		return Call
			.find(query)
			.exec()
	}
}
