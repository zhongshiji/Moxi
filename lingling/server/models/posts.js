const marked = require('marked')
const Post = require('../lib/mongo').Post
const CommentModel = require('./comments')
const	CallModel = require('./calls')

// 给 post 添加留言数 commentsCount
Post.plugin('addCommentsCount', {
  afterFind: function (posts) {
    return Promise.all(posts.map(function (post) {
      return CommentModel.getCommentsCount(post._id).then(function (commentsCount) {
        post.commentsCount = commentsCount;
        return post;
      });
    }));
  },
  afterFindOne: function (post) {
    if (post) {
      return CommentModel.getCommentsCount(post._id).then(function (count) {
        post.commentsCount = count;
        return post;
      });
    }
    return post;
  }
});

//将post的content从markdown转换成html
Post.plugin('contentToHtml', {
	afterFind: function (posts) {
		return posts.map(function (post) {
			post.content = marked(post.content)
			return post
		})
	},
	afterFindOne: function (post) {
		if (post) {
			post.content = marked(post.content)
		}
		return post
	}
})

module.exports = {
	//创建一篇文章
	create: function create(post) {
		return Post.create(post).exec()
	},

	//根据用户名更新文章
	update: function update(username, data) {
		return Post.update({ username: username }, { $set: data }, { upsert: false, multi: true }).exec()
	},

	//通过文章id获取一篇文章
	getPostById: function getPostById (postId) {
		return Post
			.findOne({ _id: postId })
			.populate({ path: 'author', model: 'User' })
			.addCreatedAt()
			.addCommentsCount()
			// .contentToHtml()
			.exec()
	},

	//通过文章类别获取此类别所有文章
	getPostsByClassify: function getPostsByClassify(type) {
		const query = {}
		query.classify = new RegExp(type)
		return Post
			.find(query)
			.sort({ _id: -1 })
			.addCreatedAt()
			.addCommentsCount()
			.exec()
	},

	//通过文章标题获取此类别所有文章
	getPostsByTitle: function getPostsByTitle(search) {
		const query = {}
		query.title = new RegExp(search)
		return Post
			.find(query)
			.sort({ _id: -1 })
			.addCreatedAt()
			.addCommentsCount()
			.exec()
	},

	//按创建时间降序获取所有用户文章或者某个特定用户的所有文章
	getPosts: function getPosts (author) {
		const query = {}
		if (author) {
			query.author = author
		}
		return Post
			.find(query)
			.populate({ path: 'author', model: 'User' })
			.sort({ _id: -1 })
			.addCreatedAt()
			.addCommentsCount()
			// .contentToHtml()
			.exec()
	},

	//通过文章id给pv加1
	incPv: function incPv(postId) {
		return Post
			.update({ _id: postId }, { $inc: { pv: 1 } })
			.exec()
	}
}