<template>
	<div id="posts">
		<div class="a-post" v-for="post,index in posts" :key="post._id">
			<div class="a-post-layout">
				<div class="headshot">
					<img :src="post.headUrl" title="咘噜咘噜嘻哗哒" />
				</div>
				<div class="a-post-detail">
					<div class="post-title" @click="toBlogView(index)">
						{{ post.nickname }}: {{ post.title }}
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
					<el-button icon="el-icon-edit">浏览</el-button>
					<el-button icon="el-icon-share">留言</el-button>
					<el-button icon="el-icon-delete">赞</el-button>
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
			posts: []
		}
	},
	methods: {
		toBlogView(index) {
			this.$router.push({ path: `/lingling/posts/${this.posts[index]._id}` })
		}
	},
	mounted() {
		let _this = this;
		this.$http.get('/api/posts/', {
			params: { author: this.author }
		}).then(function(res) {
			_this.posts = res.data;
			// _this.posts.forEach(function (item, index) {
			// 	return marked(item.content, { sanitize: true })
			// })
			// console.log(marked(_this.posts[0].content))
		})
	},
	props: ['author']
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
