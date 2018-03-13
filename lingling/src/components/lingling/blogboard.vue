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
				<el-button type="primary">生成博客</el-button>
				<el-button type="success" @click="createPost">发布简博</el-button>
			</div>
			<div class="clear">
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			nickname: '',
			headUrl: '',
			title: '',
			content: '',
			options: [{
				value: '热门',
				label: '热门'
			}, {
				value: '明星',
				label: '明星'
			}, {
				value: '全球',
				label: '全球'
			}, {
				value: '新鲜事',
				label: '新鲜事'
			}, {
				value: '搞笑',
				label: '搞笑'
			}, {
				value: '社会',
				label: '社会'
			}, {
				value: '情感',
				label: '情感'
			}, {
				value: '时尚',
				label: '时尚'
			}, {
				value: '军事',
				label: '军事'
			}, {
				value: '美女',
				label: '美女'
			}, {
				value: '体育',
				label: '体育'
			}, {
				value: '动漫',
				label: '动漫'
			}],
			classify: [],
			markblog: '',
		}
	},
	created () {
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
		createPost () {
			let _this = this;
			// console.log(this.title);
			// console.log(this.content);
			// console.log(this.classify.toString());
			this.$http.post('/api/posts/create', {
				nickname: this.nickname,
				headUrl: this.headUrl,
				title: this.title,
				content: this.content,
				classify: this.classify.toString(),
				markblog: this.markblog
			}).then(function (res) {
				location.reload()
			})
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
	box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.15) inset;
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
