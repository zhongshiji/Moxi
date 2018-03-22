<template>
	<div id="blogview">
		<div class="view-layout">
			<div class="article">
				<h1 class="title">{{ this.post.title }}</h1>
				<div class="author">
					<div class="avatar">
						<img :src="this.post.headUrl">
					</div>
					<div class="info">
						<span class="name">{{ this.post.nickname }}</span>
						<div class="meta">{{ this.post.created_at }}</div>
					</div>
				</div>
				<div class="tinyblog">
					<p>简述：{{ this.post.content }}</p>
				</div>
				<div class="show-content" v-html="compiledMarkdown()"></div>
			</div>
			<div class="meta-bottom">
				<div class="call">
					<el-button round icon="icon-heart" @click="playcall"> 喜欢 | {{ this.callsCount }}
					</el-button>
				</div>
			</div>
			<div class="new-comment">
				<div class="head">
					<img :src="this.headUrl">
				</div>
				<div class="sign-container">
					<el-input type="textarea" :autosize="{ minRows: 3, maxRows: 3}" resize="none" v-model="content" :disabled="this.$store.state.user == null">
					</el-input>
					<div class="comment-tip" v-if="!this.$store.state.user">登录后才可以发表评论哦~</div>
				</div>
				<el-button size="mini" style="float: right" type="success" :disabled="this.$store.state.user == null" @click="handleSubmit">提交</el-button>
				<div class="clear"></div>
			</div>
			<div class="show-comments-count">
				<p v-if="this.content">{{ this.commentsCount+1 }}条评论</p>
				<p v-if="!this.content">{{ this.commentsCount }}条评论</p>
			</div>
			<div class="borderB"></div>
			<div class="my-comment" v-if="this.content">
				<div class="author">
					<div class="avatar">
						<img :src="this.headUrl">
					</div>
					<div class="info">
						<span class="name">{{ this.userinfo.nickname }}</span>
					</div>
				</div>
				<div class="comment-wrap">
					<p>{{ this.content }}</p>
				</div>
			</div>
			<div class="comments" v-for="comment,index in comments" :key="comment._id">
				<div class="comment-one">
					<div class="avatar">
						<img :src="comment.authorhead">
					</div>
					<div class="info">
						<span class="name">{{ comment.authornick }}</span>
						<div class="meta">{{ comment.created_at }}</div>
					</div>
					<div class="delete" v-if="comment.author == user" @click="deleteComment(index)">删除</div>
				</div>
				<div class="comment-wrap">
					<p>{{ comment.content }}</p>
				</div>
			</div>
		</div>
	</div>
	</div>
</template>
<script>
import marked from 'marked'
export default {
	data() {
		return {
			postId: '',
			userinfo: {},
			post: {},
			headUrl: 'static/images/avatar.png',
			content: '',
			comments: [],
			commentsCount: 0,
			callsCount: 0,
		}
	},
	computed: {
		user () {
			if (this.$store.state.user) {
				return JSON.parse(this.$store.state.user).username
			}
		}
	},
	methods: {
		compiledMarkdown: function() {
			return marked(this.post.markblog || '', { sanitize: true })
		},
		playcall() {
			let _this = this;

			if (!this.$store.state.user) {
				_this.$notify({
					title: '错误',
					message: '登录后才能打call哦~',
					type: 'error',
					position: 'bottom-right'
				})
				return
			}

			_this.$http.get('/api/calls/', {
				params: { postId: _this.$route.params.postId }
			}).then(function(res) {
				if (res.data[0]) {
					if (res.data[0].username.indexOf(JSON.parse(_this.$store.state.user).username) != -1) {
						_this.$notify({
							title: '提醒',
							message: '您已经打过call了~',
							type: 'warning',
							position: 'bottom-right'
						})
					} else {
						_this.$http.post('api/calls/addPost', {
							postId: _this.$route.params.postId
						}).then(function(res) {
							_this.callsCount += 1;
							console.log(res)
						})
					}
				} else {
					_this.$http.post('api/calls/addPost', {
						postId: _this.$route.params.postId
					}).then(function(res) {
						console.log(res)
					})
				}
			})

		},
		handleSubmit() {
			let _this = this;

			if (!this.content) {
				_this.$notify({
					title: '失败',
					message: '评论内容不能为空',
					type: 'error',
					position: 'bottom-right'
				})
				return
			}

			this.$http.post('/api/comments/create', {
				content: this.content,
				postId: this.postId,
				authorhead: this.headUrl,
				authornick: this.userinfo.nickname
			}).then(function(res) {
				if (res.data.state === 1) {
					_this.$notify({
						title: '成功',
						message: res.data.msg,
						type: 'success',
						position: 'bottom-right'
					})
					setTimeout(function() {
						location.reload()
					}, 500)
				} else {
					_this.$notify({
						title: '错误',
						message: res.data.msg,
						type: 'error',
						position: 'bottom-right'
					})
				}
			})
		},
		deleteComment(index) {
			console.log(this.comments[index]._id)
			this.$http.post('api/comments/deleteComment', {
				commentId: this.comments[index]._id
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
	created() {
		let _this = this;
		this.postId = this.$route.params.postId;
		this.$http.get('api/posts/singlePost', {
			params: {
				postId: this.postId
			}
		}).then(function(res) {
			_this.post = res.data
		})

		if (this.$store.state.user) {
			this.$http.get('api/users/userinfo')
				.then(function(res) {
					_this.userinfo = res.data
					_this.headUrl = res.data.headUrl
				})
		}

		this.$http.get('/api/comments/getComments', {
			params: {
				postId: this.postId
			}
		}).then(function(res) {
			_this.comments = res.data
			// console.log(_this.comments)
		})

		this.$http.get('/api/comments/getCommentsCount', {
			params: {
				postId: this.postId
			}
		}).then(function(res) {
			_this.commentsCount = res.data.commentsCount
		})

		this.$http.get('api/calls/', {
			params: { postId: this.$route.params.postId }
		}).then(function(res) {
			if (res.data[0]) {
				_this.callsCount = res.data[0].username.length
			} else {
				_this.callsCount = 0
			}
		})
	}
}

</script>
<style scoped>
#blogview {
	position: absolute;
	width: 100%;
	top: 0;
	left: 0;
	margin: 0;
	padding: 54px 0 0 0;
}

.view-layout {
	margin: 0 auto;
	padding-top: 20px;
	padding-bottom: 40px;
	width: 620px;
}

.view-layout .article .title {
	word-break: break-word!important;
	word-break: break-all;
	margin: 20px 0 0;
	font-family: -apple-system, SF UI Display, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
	font-size: 34px;
	font-weight: 700;
	line-height: 1.3;
}

.view-layout .article .author {
	margin: 30px 0 40px;
}

.view-layout .article .author .avatar {
	width: 48px;
	height: 48px;
	vertical-align: middle;
	display: inline-block;
}

.avatar {
	cursor: pointer;
}

.avatar img {
	width: 48px;
	height: 48px;
	border: 1px solid #ddd;
	border-radius: 50%;
}

img {
	vertical-align: middle;
}

.view-layout .article .author .info,
.my-comment .author .info,
.comment-one .info {
	vertical-align: middle;
	display: inline-block;
	margin-left: 8px;
}

.view-layout .article .author .name,
.my-comment .author .name,
.comment-one .name {
	margin-right: 3px;
	font-size: 16px;
	vertical-align: middle;
	color: #333;
}

.view-layout .article .author .meta,
.my-comment .author .meta,
.comment-one .meta {
	margin-top: 5px;
	font-size: 12px;
	color: #969696;
}

.tinyblog {
	margin-bottom: 45px;
}

.view-layout .meta-bottom {
	margin-top: 40px;
	margin-bottom: 80px;
}

.call {
	display: inline-block;
}

.call .el-button {
	border: 1px solid #EA6F5A;
	border-radius: 40px;
	padding: 18px 30px;
	font-size: 20px;
	color: #EA6F5A;
}

.view-layout .article .show-content {
	color: #2f2f2f;
	word-break: break-word!important;
	word-break: break-all;
	font-size: 16px;
	font-weight: 400;
	line-height: 1.7;
}

.view-layout .new-comment {
	position: relative;
	margin: 0 0 20px 48px;
}

.new-comment .head {
	left: -48px;
	width: 38px;
	height: 38px;
	position: absolute;
	margin-right: 5px;
}

.new-comment .head img {
	display: inline-block;
	width: 38px;
	height: 38px;
	border: 1px solid #ddd;
	border-radius: 50%;
}

.sign-container {
	padding: 10px 15px;
	width: 540px;
	height: 72px;
	font-size: 13px;
	border: 1px solid #dcdcdc;
	border-radius: 4px;
	background-color: hsla(0, 0%, 71%, .1);
	display: inline-block;
	vertical-align: top;
	outline-style: none;
}

.delete {
	float: right;
	cursor: pointer;
	color: #ddd;
}

.delete:hover {
	color: #ada4a4;
	border-bottom: solid 1px #ada4a4;
}

.clear {
	clear: both;
}

.borderB {
	border-bottom: 1px solid #ddd;
}

.my-comment,
.comments {
	padding: 20px 0 10px;
	border-bottom: 1px solid #f0f0f0;
}

.my-comment .author .avatar,
.comment-one .avatar {
	width: 38px;
	height: 38px;
	vertical-align: middle;
	display: inline-block;
}

.my-comment .avatar img,
.comment-one .avatar img {
	width: 38px;
	height: 38px;
	border: 1px solid #ddd;
	border-radius: 50%;
}

.comment-wrap {
	margin: 10px 0;
	line-height: 1.5;
	font-size: 16px;
	word-break: break-word!important;
}

.comment-tip {
	margin-top: -70px;
}

.show-comments-count {
	padding-bottom: 20px;
	font-size: 17px;
	font-weight: 700;
}

</style>
