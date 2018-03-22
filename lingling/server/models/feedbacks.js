/**
 * 
 * @authors Er_shenger (Just Because)
 * @date    2018-03-22 16:57:42
 * @version $Id$
 */

const Feedback = require('../lib/mongo').Feedback

module.exports = {
	//创建一条反馈
	create: function create(feedback) {
		return Feedback.create(feedback).exec()
	},
}