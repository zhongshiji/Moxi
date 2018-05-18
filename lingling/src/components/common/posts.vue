<template>
	<div id="posts">
		<div class="a-post" v-for="post,index in posts" :key="post._id">
			<div class="a-post-layout">
				<div class="a-post-image" v-if="post.imageUrls[0]" @click="toBlogView(index)">
					<img :src="post.imageUrls[0]" alt="120" />
				</div>
				<div class="headshot" @click="toUserMain(index)">
					<img :src="post.headUrl" title="Visit Writer" />
				</div>
				<div class="a-post-detail">
					<div class="post-title" @click="toBlogView(index)">
						{{ post.nickname }}：{{ post.title }}
					</div>
					<div class="post-time">
						{{ post.created_at }}
					</div>
					<div class="post-content">
						{{ post.content }}
					</div>
				</div>
			</div>
			<div class="post-end">
				<el-button-group>
					<el-button icon="icon-eye"> 浏览 {{ post.pv }}</el-button>
					<el-button icon="icon-quill" @click="toBlogView(index)"> 评论 {{ post.commentsCount }}</el-button>
					<el-button icon="icon-heart" @click="playcall(index)"> 喜欢 {{ post.callsCount }}</el-button>
				</el-button-group>
			</div>
		</div>
	</div>
</template>
<script>
import marked from 'marked'
export default {
	data() {
		return {
			posts: [],
			calls: []
		}
	},
	methods: {
		toBlogView(index) {
			this.$router.push({ path: `/lingling/posts/${ this.posts[index]._id}` })
		},
		getPostId(index) {
			return this.posts[index]._id
		},
		toUserMain(index) {
			let _this = this;
			if (!this.$store.state.user) {
				_this.$notify({
					title: '提醒',
					message: '登录后才可以访问博主首页哦~',
					type: 'warning',
					position: 'bottom-right'
				})
				return
			} else {
				this.$router.push({ path: 'lingling/usermain', query: { author: this.posts[index].author._id, authorname: this.posts[index].author.username } })
			}
		},
		playcall(index) {
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
				params: { postId: _this.posts[index]._id }
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
							postId: _this.posts[index]._id
						}).then(function(res) {
							_this.posts[index].callsCount += 1;
						})
					}
				} else {
					_this.$http.post('api/calls/addPost', {
						postId: _this.posts[index]._id
					}).then(function(res) {
						_this.posts[index].callsCount += 1;
					})
				}
			})
		}
	},
	created() {
		let _this = this;
		//获取所有❤喜欢❤
		const calls = _this.$http.get('/api/calls/all')
			.then(function(res) {
				return res.data
			})
		//如果点击了某个特定类别（分类）...
		if (!this.$store.state.user && this.$route.params.type) {
			const posts = this.$http.get('/api/posts/select', {
				params: {
					classify: this.$route.params.type
				}
			}).then(function(res) {
				return res.data;
			})

			Promise.all([posts, calls]).then((result) => {
				// console.log(result);
				// console.log(result[0][0].author._id)
				// console.log(result[1][0].username.length)
				for (var i = 0; i < result[0].length; i++) {
					for (var j = 0; j < result[1].length; j++) {
						if (result[0][i]._id == result[1][j].postId) {
							result[0][i].callsCount = result[1][j].username.length
						}
					}
				}
				this.posts = result[0];
				if (result[0].length == 0) {
					_this.$message({
						showClose: true,
						message: '没有相关博客',
						type: 'warning'
					});
				}
			})
		} else if (this.search) {
			// 如果是通过搜索框搜索
			const posts = this.$http.get('/api/posts/search', {
				params: {
					search: this.$route.params.search
				}
			}).then(function(res) {
				return res.data;
			})

			Promise.all([posts, calls]).then((result) => {
				// console.log(result);
				// console.log(result[0][0].author._id)
				// console.log(result[1][0].username.length)
				for (var i = 0; i < result[0].length; i++) {
					for (var j = 0; j < result[1].length; j++) {
						if (result[0][i]._id == result[1][j].postId) {
							result[0][i].callsCount = result[1][j].username.length
						}
					}
				}
				this.posts = result[0];
				if (result[0].length == 0) {
					_this.$message({
						showClose: true,
						message: '没有相关博客',
						type: 'warning'
					});
				}
			})
		} else {
			//获取所有博客
			const posts = this.$http.get('/api/posts/', {
				params: { author: this.author }
			}).then((res) => {
				return res.data;
			});

			Promise.all([posts, calls]).then((result) => {
				// console.log(result);
				// console.log(result[0][0].author._id)
				// console.log(result[1][0].username.length)
				for (var i = 0; i < result[0].length; i++) {
					for (var j = 0; j < result[1].length; j++) {
						if (result[0][i]._id == result[1][j].postId) {
							result[0][i].callsCount = result[1][j].username.length
						}
					}
				}
				this.posts = result[0];
			})
		}

	},
	props: [
		'author',
		'search'
	]
}

</script>
<style scoped>
#posts {
	margin-top: 10px;
}

.a-post {
	border: 1px #ccc solid;
	/*#93d0b3*/
	border-radius: 3px;
	margin-bottom: 10px;
	box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.15) inset;
	background: #fff;
}

.a-post-image {
	cursor: pointer;
	float: right;
	margin: 10px 0 5px 5px;
	width: 150px;
	height: 120px;
}

.a-post-image img {
	border-radius: 5px;
	width: 150px;
	height: 120px;
}

.a-post-layout {
	padding: 15px 20px 4px;
}

.headshot {
	float: left;
}

.headshot img {
	width: 50px;
	height: 50px;
	border-radius: 25px;
	display: block;
	cursor: pointer;
}

.a-post-detail {
	margin-left: 60px;
}

.post-title {
	color: #333;
	cursor: pointer;
	font-size: 18px;
	font-weight: 700;
}

.post-title:hover {
	font-size: 19px;
	color: #2aa957;
}

.post-author {
	float: right;
}

.post-time {
	color: #808080;
}

.post-end {
	/*border-top: 1px solid #ccc;*/
	width: 100%;
}

.el-button-group {
	width: 100%;
	display: flex;
}

.el-button {
	/* width: 33.4%; */
	flex: 1;
}

</style>
