<template>
	<div id="login">
		<el-card class="box-card">
			<div class="login_box">
				<div class="content">
					<el-button class="loginTab" :class="{ activeStyle: ifLogintab }" type="text" @click="isLogintab">帐号登陆</el-button>
					<el-button class="regisTab justified-margin" :class="{ activeStyle: ifRegisTab }" type="text" @click="isRegisTab">安全注册</el-button>
					<el-input placeholder="请输入账号" prefix-icon="icon-user el-icon--left" v-model="username" size="small">
					</el-input>
					<br>
					<br>
					<el-input placeholder="请输入密码" prefix-icon="icon-quill el-icon--left" v-model="password" size="small">
					</el-input>
					<br>
					<br>
					<div style="margin-top: 5px;">
						<el-button class="login-button" size="small" v-if="ifLogintab">登 录</el-button>
						<el-button class="regis-button" size="small" v-if="ifRegisTab" type="danger">注 册</el-button>
					</div>
					<br>
					<div style="float: right">
						<a href="/">忘了密码? |</a>
						<a href="/">注册新账号 |</a>
						<a href="/">意见反馈</a>
					</div>
				</div>
			</div>
		</el-card>
	</div>
</template>
<script>
export default {
	data() {
		return {
			username: '',
			password: '',
			activeName: 'loginTab',
			ifLogintab: true,
			ifRegisTab: false
		}
	},
	methods: {
		handleClick(tab, event) {
			console.log(tab, event);
		},
		isLogintab() {
			this.ifLogintab = true;
			this.ifRegisTab = false;
		},
		isRegisTab() {
			this.ifLogintab = false;
			this.ifRegisTab = true;
		}
	}
}

</script>
<style scoped>
a {
	font-size: 10px;
	text-decoration: none;
	color: #ccc;
}

.box-card {
	background: #eee;
}

.login_box {
	background: #fff;
	width: 300px;
	border-radius: 2px;
}

.content {
	padding: 15px 15px 30px 15px;
}

.loginTab,
.regisTab {
	color: #ccc;
	border-radius: 0;
	float: left;
	width: 135px;
	font-weight: bold;
	margin-bottom: 25px;
	border-bottom: solid #ccc 3px;
}

.activeStyle {
	color: #333;
	font-weight: bold;
	border-bottom: solid #39a175 3px;
}

.justified-margin {
	margin-left: 0;
}

.login-button {
	width: 100%;
	background: #39a175;
	font-size: 17px;
	color: #fff;
}

.login-button:hover {
	background: #43b987;
}

.regis-button {
	width: 100%;
	font-size: 17px;
	color: #fff;
}

</style>
