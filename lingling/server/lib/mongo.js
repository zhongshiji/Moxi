const config = require('config-lite')(__dirname)
const Mongolass = require('mongolass');
const mongolass = new Mongolass();
mongolass.connect(config.mongodb);

const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')

// 根据 id 生成创建时间 created_at
mongolass.plugin('addCreatedAt', {
  afterFind: function (results) {
    results.forEach(function (item) {
      item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
    })
    return results
  },
  afterFindOne: function (result) {
    if (result) {
      result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm')
    }
    return result
  }
})

exports.User = mongolass.model('User', {
	username: { type: 'string', required: true },
	password: { type: 'string', required: true }
})
exports.User.index({ username: 1 }, { unique: true }).exec() //根据用户名找到用户，用户名全局唯一

exports.UserInfo = mongolass.model('UserInfo', {
  username: { type: 'string' },
  nickname: { type: 'string' },
  gender: { type: 'string', enum: ['m', 'f', 'x'], default: 'x' },
  email: { type: 'string' },
  headUrl: { type: 'string' },
  introduction: { type: 'string' }
})
// exports.UserInfo.index({ username: 1 }, { unique: true }).exec() //根据用户名找到用户，用户名全局唯一

exports.Post = mongolass.model('Post', {
  author: { type: Mongolass.Types.ObjectId, required: true },
  username: { type: 'string', required: true },
  nickname: { type: 'string', required: true },
  headUrl: { type: 'string', required: true },
  title: { type: 'string', required: true },
  content: { type: 'string', required: true },
  classify: { type: 'string', requred: true },
  markblog: { type: 'string' },
  pv: { type: 'number', default: 0 }
})
exports.Post.index({ author: 1, _id: -1 }).exec()//按创建时间降序查看用户的文章列表

exports.Comment = mongolass.model('Comment', {
  author: { type: 'string' },
  authorhead: { type: 'string' },
  authornick: { type: 'string' },
  content: { type: 'string' },
  postId: { type: Mongolass.Types.ObjectId }
});
exports.Comment.index({ postId: 1, _id: 1 }).exec();// 通过文章 id 获取该文章下所有留言，按留言创建时间升序
exports.Comment.index({ author: 1, _id: 1 }).exec();// 通过用户 id 和留言 id 删除一个留言