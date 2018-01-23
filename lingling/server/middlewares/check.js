module.exports = {
	checkLogin: function checkLogin(req, res, next) {
		if (!req.session.uesr) {
			return res.json({ checkCode: 0 })
		}
		next()
	},

	checkNotLogin: function checkNotLogin(req, res, next) {
		if (req.session.user) {
			return res.json({ checkCode: 1 })
		}
		next()
	}
}