const config = require('config-lite')(__dirname)
const Mongolass = require('mongolass')
const mongolass = new Mongolass()
mongolass.connect(config.mongodb)

exports.User = mongolass.model('User',{
	name: { type: 'string' },//用户名
	password: { type: 'string' },//密码
	avatar: { type: 'string' },//头像
	gender: { type: 'string', enum: ['m', 'f', 'x'] },//性别
	bio: { type: 'string' }
})

exports.User.index({ name: 1 },{ unique: true }).exec()//根据用户名找到用户，用户名全局唯一