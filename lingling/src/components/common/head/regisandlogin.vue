<template>
	<div id="regisandlogin">
		<el-button type="text" @click="showRegis"><span class="regis">注册</span></el-button>
		<el-dialog title="注册" :visible.sync="Visible1" width="30%">
			<el-input placeholder="请输入邮箱账号" prefix-icon="icon-user el-icon--left" v-model="username" size="small">
			</el-input>
			<br>
			<br>
			<el-input placeholder="请输入密码" type="password" prefix-icon="icon-quill el-icon--left" v-model="password" size="small" @keyup.enter.native="regis">
			</el-input>
			<span slot="footer" class="dialog-footer">
    		<el-button @click="Visible1 = false">取 消</el-button>
    		<el-button type="primary" @click="regis">注 册</el-button>
  		</span>
		</el-dialog>
		<el-button type="text" @click="showLogin"><span class="login">登录</span></el-button>
		<el-dialog title="登录" :visible.sync="Visible2" width="30%">
			<el-input placeholder="请输入邮箱账号" prefix-icon="icon-user el-icon--left" v-model="username" size="small">
			</el-input>
			<br>
			<br>
			<el-input placeholder="请输入密码" type="password" prefix-icon="icon-quill el-icon--left" v-model="password" size="small" @keyup.enter.native="login">
			</el-input>
			<span slot="footer" class="dialog-footer">
    		<el-button @click="Visible2 = false">取 消</el-button>
    		<el-button type="primary" @click="login">登 录</el-button>
  		</span>
		</el-dialog>
	</div>
</template>
<script>
export default {
	data() {
		return {
			Visible1: false,
			Visible2: false,
			username: '',
			password: ''
		}
	},
	methods: {
		showRegis () {
			this.Visible1 = true;
			this.username = '';
			this.password = '';
		},
		showLogin () {
			this.Visible2 = true;
			this.username = '';
			this.password = '';
		},
		login() {
			let _this = this;
			this.Visible2 = false;
			this.$http.post('/api/users/signin', {
				username: this.username,
				password: this.password
			}).then(function(res) {
				if (res.data.signinCode == 1) {
					localStorage.setItem('userDetail', JSON.stringify(res.data.user))
					_this.$store.commit('setUsername', JSON.stringify({ username: _this.username }));
					_this.$router.push({ path: '/lingling' });
					_this.$message({
						showClose: true,
						message: '登录成功',
						type: 'success'
					});
				} else {
					_this.$message({
						showClose: true,
						message: res.data,
						type: 'error'
					});
				}
			}).catch(function(e) {
				console.log(e);
			})
		},
		regis() {
			let _this = this;
			this.Visible1 = false;
			this.$http.post('/api/users/signup', {
				username: this.username,
				password: this.password
			}).then(function(res) {
				if (res.data.signupcode == 1) {
					_this.$message({
						showClose: true,
						message: '注册成功',
						type: 'success'
					});
				} else if (res.data.signupcode == 0) {
					_this.$message({
						showClose: true,
						message: '您当前注册的账号已被占用',
						type: 'error'
					});
				} else {
					_this.$message({
						showClose: true,
						message: res.data,
						type: 'error'
					});
				}
			}).catch(function(e) {
				console.log(e);
			})
		}
	}
}

</script>
<style scoped>
.regis {
	padding-right: 16px;
	border-right: solid #333 1px;
}

.el-button {
	font-size: 13px;
	color: #444;
}

.el-button:hover {
	color: #fff;
}

</style>
