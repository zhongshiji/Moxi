const UserInfo = require('../lib/mongo').UserInfo

module.exports = {
	//新增用户信息
	create: function create(userinfo) {
		return UserInfo.create(userinfo).exec()
	},

	//修改用户信息
	update: function update(username, data) {
		return UserInfo.update({ username: username }, { $set: data }).exec()
	},

	//通过用户名获取用户信息
	getUserInfoByName: function getUserInfoByName(username) {
		return UserInfo
			.findOne({ username: username })
			.addCreatedAt()
			.exec()
	}
}