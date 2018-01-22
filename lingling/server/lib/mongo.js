const config = require('config-lite')(__dirname)
const Mongolass = require('mongolass');
const mongolass = new Mongolass();
mongolass.connect(config.mongodb);

exports.User = mongolass.model('User', {
	username: { type: 'string', required: true },
	password: { type: 'string', required: true }
})
exports.User.index({ username: 1 }, { unique: true }).exec() //根据用户名找到用户，用户名全局唯一