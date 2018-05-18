<template>
	<header class="el-header">
		<el-row type="flex" justify="start" :gutter="10">
			<el-col :span="3">
				<div class="logo grid-content" @click="toHome"></div>
			</el-col>
			<el-col :span="8" :offset="1">
				<el-input placeholder="搜索博客" v-model="search" size="small" @keyup.enter.native="toSearchPage">
					<i slot="suffix" class="el-input__icon el-icon-search" @click="toSearchPage"></i>
				</el-input>
			</el-col>
			<el-col :span="8" :offset="1">
				<div class="h-list grid-content">
					<ul class="header-list">
						<li>
							<el-button type="text" @click="toHome"><i class="icon-home1 el-icon--left"></i>首页</el-button>
						</li>
						<li>
							<el-button type="text" @click="toOther"><i class="icon-book el-icon--left"></i>资料</el-button>
						</li>
						<li>
							<el-button type="text" @click="showFeedBack"><i class="icon-phone el-icon--left"></i>反馈</el-button>
							<el-dialog title="反馈" :visible.sync="visible" width="30%">
								<el-input placeholder="请输入邮箱账号" prefix-icon="icon-user el-icon--left" v-model="email" size="small">
								</el-input>
								<br>
								<br>
								<div class="border">
									<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8 }" placeholder="请输入亟待改善的问题" v-model="questions">
									</el-input>
								</div>
								<br>
								<div class="border">
									<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8 }" placeholder="请输入改善的建议" v-model="suggestions">
									</el-input>
								</div>
								<span slot="footer" class="dialog-footer">
    							<el-button @click="visible = false">取 消</el-button>
    							<el-button type="primary" @click="postFeedBack">提 交</el-button>
  							</span>
							</el-dialog>
						</li>
						<li>
							<el-button type="text" @click="toAbout"><i class="icon-steam el-icon--left"></i>关于</el-button>
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
			email: '',
			search: '',
			questions: '',
			suggestions: '',
			visible: false
		}
	},
	components: {
		regisandlogin: regisandlogin,
		haveloggedin: haveloggedin
	},
	methods: {
		toHome() {
			let _this = this;
			this.$http.get('/api/')
				.then(function(res) {
					if (res.data.checkCode == 1) {
						_this.$router.push('/lingling');
					} else {
						_this.$router.push('/');
					}
				})
		},
		toSearchPage() {
			location.reload()
			this.$router.push({ path: `/search/${ this.search }` })
		},
		toFindMore() {
			this.$message({
				showClose: true,
				message: '敬请期待~',
				type: 'warning'
			});
		},
		toOther() {
			this.$router.push('/markdownUsage')
		},
		toAbout() {
			this.$router.push('/about')
		},
		showFeedBack() {
			this.email = '';
			this.questions = '';
			this.suggestions = '';
			this.visible = true;
		},
		postFeedBack() {
			this.visible = false;

			if (!this.email) {
        this.$notify({
          title: '提醒',
          message: '请输入邮箱地址',
          type: 'warning',
          position: 'bottom-right'
        })
        return
      }

      if (!this.questions && !this.suggestions) {
        this.$notify({
          title: '提醒',
          message: '请输入问题或建议',
          type: 'warning',
          position: 'bottom-right'
        })
        return
      }

			this.$http.post('api/posts/postFeedBack', {
				email: this.email,
				questions: this.questions,
				suggestions: this.suggestions
			}).then((res) => {
				if (res.data.state === 1) {
					this.$notify({
						title: '成功',
						message: res.data.msg,
						type: 'success',
						position: 'bottom-right'
					})
					setTimeout(function() {
						location.reload()
					}, 500)
				} else {
					this.$notify({
						title: '错误',
						message: res.data.msg,
						type: 'error',
						position: 'bottom-right'
					})
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
	/*background-color: rgba(54, 128, 94, 0.75);*/
	/*background-color: rgba(214, 206, 189, 0.75);*/
	background-color: rgba(222, 214, 189, 0.75);
	color: #444;
	text-align: center;
	line-height: 54px;
	z-index: 1001;
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

.border {
	border: 1px solid #dcdfe6;
	border-radius: 3px;
}

</style>
