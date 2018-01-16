<template>
	<el-header>
		<el-row type="flex" justify="start" :gutter="10">
			<el-col :span="3">
				<div class="logo grid-content"></div>
			</el-col>
			<el-col :span="8" :offset="1">
				<el-input placeholder="搜索博客、找人" v-model="search" size="small">
					<i slot="suffix" class="el-input__icon el-icon-search"></i>
				</el-input>
			</el-col>
			<el-col :span="3" :offset="6">
				<div class="h-list grid-content">
					<ul class="header-list">
						<li>
							<el-button type="text"><i class="el-icon-menu el-icon--left"></i>首页</el-button>
						</li>
						<li>
							<el-button type="text"><i class="el-icon-view el-icon--left"></i>发现</el-button>
						</li>
					</ul>
				</div>
			</el-col>
			<el-col :span="3">
				<div>
					<el-button type="text"><span class="register">注册</span></el-button>
					<el-button type="text"><span class="login">登录</span></el-button>
				</div>
			</el-col>
		</el-row>
	</el-header>
</template>
<script>
export default {
	data() {
		return {
			search: ''
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
}

.header-list li {
	position: relative;
	float: left;
	margin-left: 25px;
}

.header-list li:hover {
	background-color: #3a714d;
}

.header-list li i {
	/*font-size: 20px;*/
}

.el-button {
	height: 60px;
	color: #333;
}

.el-button:hover {
	color: #fff;
}

.el-header {
	position: fixed;
	width: 100%;
	top: 0;
	left: 0;
	/*background-color: #fff;*/
	background-color: rgba(54, 128, 94, 0.94);
	color: #ccc;
	text-align: center;
	line-height: 60px;
	z-index: 9999;
}

.el-row {
	&:last-child {
		margin-bottom: 0;
	}
}

.el-col {
	height: 60px;
	border-radius: 4px;
}

.logo {
	height: 60px;
	background: url("../../assets/logo.png") no-repeat -25px;
	background-size: 400px 55px;
}

.grid-content {
	border-radius: 4px;
	min-height: 36px;
}

.row-bg {
	padding: 10px 0;
	background-color: #f9fafc;
}

.register {
	padding-right: 16px;
	border-right: solid #333 1px;
}

</style>
