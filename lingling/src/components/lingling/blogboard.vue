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
				<el-input type="textarea" :autosize="{ minRows: 3, maxRows: 8}" placeholder="请输入内容" resize="none" v-model="content">
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
			title: '',
			content: '',
			options: [{
				value: '选项1',
				label: '热门'
			}, {
				value: '选项2',
				label: '明星'
			}, {
				value: '选项3',
				label: '头条'
			}, {
				value: '选项4',
				label: '新鲜事'
			}, {
				value: '选项5',
				label: '搞笑'
			}, {
				value: '选项6',
				label: '社会'
			}, {
				value: '选项7',
				label: '情感'
			}, {
				value: '选项8',
				label: '时尚'
			}, {
				value: '选项9',
				label: '军事'
			}, {
				value: '选项10',
				label: '美女'
			}, {
				value: '选项11',
				label: '体育'
			}, {
				value: '选项12',
				label: '动漫'
			}],
			classify: []
		}
	},
	methods: {
		createPost () {
			let _this = this;
			// console.log(this.title);
			// console.log(this.content);
			// console.log(this.classify.toString());
			this.$http.post('/api/posts/create', {
				title: this.title,
				content: this.content,
				classify: this.classify.toString()
			}).then(function (res) {
				location.reload()
				console.log('hello')
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
