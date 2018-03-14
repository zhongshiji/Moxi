<template>
	<header class="el-header">
		<el-row type="flex" justify="start" :gutter="10">
			<el-col :span="3">
				<div class="logo grid-content" @click="tohome"></div>
			</el-col>
			<el-col :span="8" :offset="1">
				<el-input placeholder="搜索博客、找人" v-model="search" size="small">
					<i slot="suffix" class="el-input__icon el-icon-search"></i>
				</el-input>
			</el-col>
			<el-col :span="8" :offset="1">
				<div class="h-list grid-content">
					<ul class="header-list">
						<li>
							<el-button type="text" @click="tohome"><i class="icon-home1 el-icon--left"></i>首页</el-button>
						</li>
						<li>
							<el-button type="text"><i class="icon-compass2 el-icon--left"></i>发现</el-button>
						</li>
						<li>
							<el-button type="text"><i class="icon-play el-icon--left"></i>关于</el-button>
						</li>
						<li>
							<el-button type="text"><i class="icon-steam el-icon--left"></i>游戏</el-button>
						</li>
					</ul>
				</div>
			</el-col>
			<el-col :span="3">
				<regisandlogin v-if="!user"></regisandlogin>
				<haveloggedin v-if="user"></haveloggedin>
			</el-col>
		</el-row>
	</header>
</template>
<script>
import regisandlogin from './head/regisandlogin'
import haveloggedin from './head/haveloggedin'
export default {
	data() {
		return {
			search: ''
		}
	},
	components: {
		regisandlogin: regisandlogin,
		haveloggedin: haveloggedin
	},
	methods: {
		tohome() {
			let _this = this;
			this.$http.get('/api/')
				.then(function (res) {
					if(res.data.checkCode == 1) {
						_this.$router.push('/lingling');
					} else {
						_this.$router.push('/');
					}
				})
		}
	},
	computed: {
		user() {
			return this.$store.state.user;
		}
	},
	watch: {
		$route(to, from) {
			// console.log(to);
			// console.log(from);
		}
	}
}

</script>
<style scoped>
ul {
	list-style: none;
	/*去掉ul默认内外边距*/
	padding: 0;
	margin: 0;
	height: 54px;
}

.h-list {
	overflow: hidden;
}

.header-list li {
	position: relative;
	display: inline-block;
	/*margin-left: 10px;*/
	/*font-size: 16px;*/
	padding: 0 20px;
	height: 54px;
}

.header-list .el-button {
	color: #333;
	font-size: 14px;
}

.header-list li:hover {
	background-color: #3a714d;
}

.header-list li i {
	/*font-size: 18px;*/
}

.el-button {
	height: 54px;
}

.el-button:hover {
	color: #fff;
}

.el-header {
	position: fixed;
	width: 100%;
	height: 54px;
	top: 0;
	left: 0;
	/*background-color: #fff;*/
	background-color: rgba(54, 128, 94, 0.94);
	color: #444;
	text-align: center;
	line-height: 54px;
	z-index: 9999;
}

.el-row {
	&:last-child {
		margin-bottom: 0;
	}
}

.el-col {
	height: 54px;
	border-radius: 4px;
}

.logo {
	height: 54px;
	background: url("../../assets/logo.png") no-repeat -25px;
	background-size: 400px 55px;
	cursor: pointer;
}

.grid-content {
	border-radius: 4px;
	min-height: 36px;
}

.row-bg {
	padding: 10px 0;
	background-color: #f9fafc;
}

</style>
