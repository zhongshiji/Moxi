<template>
	<div id="haveloggedin">
		<el-dropdown>
			<el-button>
				<div class="headshot">
					<img src="../../../assets/me.jpg" alt="咘噜咘噜嘻哗哒" />
				</div>
				<i class="el-icon-caret-bottom el-icon--left"></i>
			</el-button>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item><i class="icon-library el-icon--left"></i> 我的主页</el-dropdown-item>
				<el-dropdown-item><i class="icon-quill el-icon--left"></i> 写博客</el-dropdown-item>
				<el-dropdown-item><i class="icon-cog el-icon--left"></i> 个人设置</el-dropdown-item>
				<el-dropdown-item @click.native="logout"><i class="icon-switch el-icon--left"></i> 退出</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</div>
</template>
<script>
export default {
	data() {
		return {

		}
	},
	methods: {
		logout() {
			let _this = this;
			this.$http.get('/')
				.then(function(res) {
					sessionStorage.clear();
					_this.$store.commit('clearUser');
					_this.$router.push('/');
				})
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
	height: 60px;
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
	padding-top: 10px;
}

</style>
