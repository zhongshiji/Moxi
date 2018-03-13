/**
 * 
 * @authors Er_shenger (Just Because)
 * @date    2018-03-12 20:55:42
 * @version $Id$
 */

const Comment = require('../lib/mongo').Comment

module.exports = {
	//注册一个留言
	create: function create(comment) {
		return Comment.create(comment).exec()
	},

	//根据用户修改个人信息更新留言
	update: function update(author, data) {
		return Comment.update({ author: author }, { $set: data }, { upsert: false, multi: true }).exec()
	},

	// 通过留言 id 获取一个留言
  getCommentById: function getCommentById (commentId) {
    return Comment.findOne({ _id: commentId }).exec()
  },

  // 通过留言 id 删除一个留言
  delCommentById: function delCommentById (commentId) {
    return Comment.deleteOne({ _id: commentId }).exec()
  },

  // 通过文章 id 删除该文章下所有留言
  delCommentsByPostId: function delCommentsByPostId (postId) {
    return Comment.deleteMany({ postId: postId }).exec()
  },

  // 通过文章 id 获取该文章下所有留言，按留言创建时间升序
  getComments: function getComments (postId) {
    return Comment
      .find({ postId: postId })
      .populate({ path: 'author', model: 'User' })
      .sort({ _id: -1 })
      .addCreatedAt()
      .exec()
  },

  // 通过文章 id 获取该文章下留言数
  getCommentsCount: function getCommentsCount (postId) {
    return Comment.count({ postId: postId }).exec()
  }
}