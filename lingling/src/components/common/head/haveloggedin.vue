<template>
	<div id="haveloggedin">
		<el-dropdown>
			<el-button>
				<div class="headshot">
					<img :src="headUrl" alt="咘噜咘噜嘻哗哒" />
				</div>
				<i class="el-icon-caret-bottom el-icon--left"></i>
			</el-button>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item @click.native="toUserMain"><i class="icon-library el-icon--left"></i> 我的主页</el-dropdown-item>
				<el-dropdown-item @click.native="toBlogEdit"><i class="icon-quill el-icon--left"></i> 写博客</el-dropdown-item>
				<el-dropdown-item @click.native="toChangeInfo"><i class="icon-cog el-icon--left"></i> 个人设置</el-dropdown-item>
				<el-dropdown-item @click.native="logout"><i class="icon-switch el-icon--left"></i> 退出</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</div>
</template>
<script>
export default {
	data() {
		return {
			headUrl: ''
		}
	},
	created() {
		let _this = this;
		this.$http.get('api/users/userinfo')
			.then(function(res) {
				if (!res.data.headUrl) {
					_this.headUrl = 'static/images/headshot.jpg';
				} else {
					_this.headUrl = res.data.headUrl;
				}
			})
	},
	methods: {
		logout() {
			let _this = this;
			this.$http.get('/api/users/signout')
				.then(function(res) {
					if (res.data.checkCode == 0) {
						_this.$message({
							showClose: true,
							message: '尚未登录',
							type: 'error'
						});
						_this.$router.push('/');
					} else {
						localStorage.clear();
						_this.$store.commit('clearUser');
						_this.$router.push('/');
						_this.$message({ showClose: true, message: '已退出', type: 'success' });
					}
				})
		},
		toUserMain () {
			this.$router.push('/lingling/usermain')
		},
		toBlogEdit () {
			this.$router.push('/lingling/blogedit')
		},
		toChangeInfo () {
			this.$router.push('/lingling/changeinfo')
		}
	}
}

</script>
<style scoped>
#haveloggedin {
	height: 60px;
}

.el-dropdown {
	float: left;
	height: 60px;
}

.el-button {
	display: block;
	height: 54px;
	background: transparent;
	border: none;
	/*padding: 0;
	margin: 0;*/
}

.el-button:hover {
	color: #fff;
}

.headshot img {
	border-radius: 25px;
	float: left;
	width: 30px;
	height: 30px;
	margin-right: 8px;
	top: 0;
}


.el-icon-caret-bottom {
	padding-top: 9px;
}

</style>
