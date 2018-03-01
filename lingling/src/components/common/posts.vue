<template>
	<div id="posts">
		<div class="a-post" v-for="post in posts">
			<div class="a-post-layout">
				<div class="headshot">
				</div>
				<div class="a-post-detail">
					<div class="post-title">
						{{ post.author.username }}: {{ post.title }}
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
export default {
	data() {
		return {
			posts: [],
		}
	},
	methods: {

	},
	created() {
		let _this = this;
		console.log('hellp')
		this.$http.get('/api/posts/')
			.then(function(res) {
				console.log(res.data)
				_this.posts = res.data;
			})
	}
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
	width: 50px;
	height: 50px;
	background: #ccc;
	border-radius: 25px;
}

.a-post-detail {
	margin-left: 60px;
}

.post-title {
	color: #333;
	font-size: 18px;
	font-weight: 700;
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
