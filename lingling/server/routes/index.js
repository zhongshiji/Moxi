var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // res.send('hello world')
  console.log("hello express!");
  res.json({ title:'express', welcome:'welcome to express!' });
  // res.redirect('/public/index.html');
  const wel = req.query.ID
  console.log(wel)
});
router.post('/', function (req, res, next) {
	const username = req.query.username
	let password = req.query.password

	console.log(username, password);
	//待写入数据库的用户信息
	let user = {
		username: username,
		password: password
	}
	// //用户信息写入数据库
	// UserModel.create(user)
	// 	.then(function (result) {
	// 		//此 user 是插入 mongodb后的值，包含_id
	// 		user = result.ops[0]
	// 		console.log('注册成功')
	// 		res.redirect('/home')
	// 	})
	// 	.catch(function (e) {
	// 		if(e.message.match('duplicate key')){
	// 			return res.redirect('/')
	// 		}
	// 		next(e)
	// 	})
})

module.exports = router;
