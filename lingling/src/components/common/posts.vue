<template>
	<div id="posts">
		<h1>{{ msg }}</h1>
		<h2>Essential Links!</h2>
		<h2>Ecosystem</h2>
		<el-input v-model="username" placeholder="请输入账号"></el-input>
		<el-input v-model="password" placeholder="请输入密码"></el-input>
		<el-button type="success" @click="register">注册</el-button>
		<el-button type="success" @click="toHome">登录</el-button>
		<h1>{{ msg }}</h1>
		<h2>Essential Links!</h2>
		<h2>Ecosystem</h2>
		<el-input v-model="username" placeholder="请输入账号"></el-input>
		<el-input v-model="password" placeholder="请输入密码"></el-input>
		<el-button type="success" @click="register">注册</el-button>
		<el-button type="success" @click="toHome">登录</el-button>
		<h1>{{ msg }}</h1>
		<h2>Essential Links!</h2>
		<h2>Ecosystem</h2>
		<el-input v-model="username" placeholder="请输入账号"></el-input>
		<el-input v-model="password" placeholder="请输入密码"></el-input>
		<el-button type="success" @click="register">注册</el-button>
		<el-button type="success" @click="toHome">登录</el-button>
	</div>
</template>

<script>
export default {
	name: 'posts',
	data() {
		return {
			username: '',
			password: '',
			msg: 'Welcome to Your Vue.js App'
		}
	},
	methods: {
		register() {
			let _this = this;
			//注册
			this.$http({
				url: "/api/",
				method: "POST",
				params: {
					username: this.username,
					password: this.password
				}
			}).then(function(argument) {
				// console.log(argument);
			})
		},
		toHome() {
			let _this = this;
			//登录
			this.$router.push('/home');
		}
	}
}
</script>

<style scoped>
h1, h2 {
	font-weight: normal;
}

</style>
