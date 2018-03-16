<template>
	<div id="blogboard">
		<div class="board-lay">
			<div class="ll-tip">
				<p>在这儿编辑您的博客吧~</p>
			</div>
			<div class="title">
				<el-input v-model="title" placeholder=" 请输入标题"></el-input>
			</div>
			<div class="input">
				<el-input type="textarea" :autosize="{ minRows: 3, maxRows: 8}" placeholder="请输入简要内容" resize="none" v-model="content">
				</el-input>
			</div>
			<div class="classify">
				<span>分类：</span>
				<el-select v-model="classify" multiple collapse-tags placeholder="请选择">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
			<div class="ll-button">
				<el-button type="primary" @click="toBlogView">生成博客</el-button>
				<el-button type="success" @click="createPost">发布简博</el-button>
			</div>
			<div class="clear">
			</div>
		</div>
	</div>
</template>
<script>
// import Bus from '../../eventBus/bus'
export default {
	data() {
		return {
			nickname: '',
			headUrl: '',
			title: '',
			content: '',
			options: [{
				value: 'Hots',
				label: '热门'
			}, {
				value: 'Stars',
				label: '明星'
			}, {
				value: 'World',
				label: '全球'
			}, {
				value: 'News',
				label: '新鲜事'
			}, {
				value: 'Amuse',
				label: '搞笑'
			}, {
				value: 'Society',
				label: '社会'
			}, {
				value: 'Emotions',
				label: '情感'
			}, {
				value: 'Fashions',
				label: '时尚'
			}, {
				value: 'Military',
				label: '军事'
			}, {
				value: 'Beauty',
				label: '美女'
			}, {
				value: 'Sports',
				label: '体育'
			}, {
				value: 'Anime',
				label: '动漫'
			}],
			classify: [],
			markblog: '',
		}
	},
	created() {
		let _this = this;
		this.$http.get('api/users/userinfo')
			.then(function(res) {
				if (!res.data.nickname) {
					_this.headUrl = 'static/images/headshot.jpg';
				} else {
					_this.headUrl = res.data.headUrl;
					_this.nickname = res.data.nickname;
				}
			});
	},
	methods: {
		createPost() {
			let _this = this;

			if(!this.nickname) {
				_this.$notify({
					title: '失败',
					message: '填写个人信息后才可以发表简博哦~',
					type: 'error',
					position: 'bottom-right'
				})
				return
			}

			if (!this.title) {
				_this.$notify({
					title: '失败',
					message: '标题不能为空',
					type: 'error',
					position: 'bottom-right'
				})
				return
			}

			this.$http.post('/api/posts/create', {
				nickname: this.nickname,
				headUrl: this.headUrl,
				title: this.title,
				content: this.content,
				classify: this.classify.toString(),
				markblog: this.markblog
			}).then(function(res) {
				if (res.data.postCode === 1) {
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
		toBlogView() {
			this.$router.push({ name: 'blogedit', params: { title: this.title, content: this.content, classify: this.classify } })
			// Bus.$emit('getTarget', this.title)
		}
	}
}

</script>
<style scoped>
.board-lay {
	border: solid 1px #93d0b3;
	border-radius: 3px;
	padding: 15px 10px 10px;
}

.ll-tip p {
	margin: 0;
	padding: 0 0 8px 0;
}

.title {
	margin-bottom: 10px;
}

.input {
	margin-bottom: 10px;
	padding: 5px;
	border-color: #ccc;
	border-style: solid;
	border-width: 1px;
	box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.15) inset;
}

.classify {
	float: left;
}

.ll-button {
	float: right;
}

.clear {
	clear: both;
}

</style>
