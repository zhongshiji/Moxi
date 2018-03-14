<template>
	<div id="posts">
		<div class="a-post" v-for="post,index in posts" :key="post._id">
			<div class="a-post-layout">
				<div class="headshot" @click="toUserMain(index)">
					<img :src="post.headUrl" title="咘噜咘噜嘻哗哒" />
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
					<el-button icon="el-icon-view">浏览 {{ post.pv }}</el-button>
					<el-button icon="el-icon-edit-outline" @click="toBlogView(index)">评论 {{ post.commentsCount }}</el-button>
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
		const calls = _this.$http.get('/api/calls/all')
			.then(function(res) {
				return res.data
			})
		if (!this.$store.state.user && this.$route.params.type) {
			this.$http.get('/api/posts/select', {
				params: {
					classify: this.$route.params.type
				}
			}).then(function(res) {
				_this.posts = res.data
			})
		} else {
			const posts = this.$http.get('/api/posts/', {
				params: { author: this.author }
			}).then((res) => {
				return res.data;
			});

			Promise.all([posts, calls]).then((result) => {
				console.log(result);
				console.log(result[0][0].author._id)
				console.log(result[1][0].username.length)
				for (var i = 0; i < result[0].length; i++) {
					for (var j = 0; j < result[1].length; j++) {
						if (result[0][i]._id == result[1][j].postId) {
							result[0][i].callsCount = result[1][j].username.length
						}
					}
				}
				this.posts = result[0];
				console.log(result[0])
			})
		}


	},
	props: [
		'author'
	]
}

</script>
<style scoped>
#posts {
	margin-top: 10px;
}

.a-post {
	border: 1px #93d0b3 solid;
	border-radius: 3px;
	margin-bottom: 10px;
}

.a-post-layout {
	padding: 20px 20px 4px;
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
