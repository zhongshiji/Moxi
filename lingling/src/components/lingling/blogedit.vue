<template>
	<div id="blogedit">
		<div class="LL-layout">
			<div class="main-layout">
				<el-row class="title">
					<el-col :span="2">
						<div class="label">
							标题
						</div>
					</el-col>
					<el-col :span="22">
						<el-input v-model="title"></el-input>
					</el-col>
				</el-row>
				<el-row class="tinyblog">
					<el-col :span="2">
						<div class="label">
							简博内容
						</div>
					</el-col>
					<el-col :span="22">
						<div class="borderjus">
							<el-input type="textarea" :rows="4" v-model="tinyblog">
							</el-input>
						</div>
					</el-col>
				</el-row>
				<el-row class="classify">
					<el-col :span="2">
						<div class="label">
							分类
						</div>
					</el-col>
					<el-col :span="22">
						<el-select v-model="classify" style="width: 100%" multiple placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-col>
				</el-row>
				<el-row class="markblog">
					<el-col :span="2">
						<div class="label">
							正文
						</div>
					</el-col>
					<el-col :span="22">
						<el-col :span="12">
							<textarea :value="markblog" @input="update"></textarea>
						</el-col>
						<el-col :span="12">
							<div class="compileM" v-html="compiledMarkdown"></div>
						</el-col>
					</el-col>
				</el-row>
				<el-row class="editbutton">
					<el-col :span="2">
						<div class="label">
						</div>
					</el-col>
					<el-col :span="22">
						<div class="edit-button">
							<el-button type="primary" round @click="saveBlog">发表博客</el-button>
							<el-button type="info" round @click="toLingLing">我不写了</el-button>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>
<script>
// import Bus from '../../eventBus/bus'
import _ from 'lodash'
import marked from 'marked'
import hightlight from 'highlight.js'
export default {
	data() {
		return {
			nickname: '',
			headUrl: '',
			title: '',
			tinyblog: '',
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
				value: 'Militart',
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
			markblog: '# hello'
		}
	},
	computed: {
		compiledMarkdown: function() {
			return marked(this.markblog, { sanitize: true })
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


		this.title = this.$route.params.title
		this.tinyblog = this.$route.params.content
		this.classify = this.$route.params.classify

		// Bus.$on('getTarget', target => {
		// 	console.log(target);
		// });
	},
	methods: {
		update: _.debounce(function(e) {
			this.markblog = e.target.value
		}, 300),
		toLingLing () {
			this.$router.push('/lingling')
		},
		saveBlog () {
			let _this = this;
      if (this.title.length === 0) {
        this.$notify({
          title: '提醒',
          message: '请输入标题',
          type: 'warning',
          position: 'bottom-right'
        })
        return
      }
      if (this.tinyblog.length === 0) {
        this.$notify({
          title: '提醒',
          message: '请输入简博内容',
          type: 'warning',
          position: 'bottom-right'
        })
        return
      }
      if (this.markblog.length === 0) {
        this.$notify({
          title: '提醒',
          message: '请输入博客正文',
          type: 'warning',
          position: 'bottom-right'
        })
        return
      }
      this.$http.post('/api/posts/create', {
				nickname: this.nickname,
				headUrl: this.headUrl,
				title: this.title,
				content: this.tinyblog,
				classify: this.classify.toString(),
				markblog: this.markblog
			}).then(function (res) {
				if (res.data.postCode === 1) {
					_this.$notify({
						title: '成功',
						message: res.data.msg,
						type: 'success',
						position: 'bottom-right'
					})
					setTimeout(function() {
						_this.$router.push('/lingling')
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
		}
	}
}

</script>
<style scoped>
#blogedit {
	position: absolute;
	width: 100%;
	top: 0;
	left: 0;
	margin: 0;
	padding: 54px 0 0 0;
	/*background: #983838;*/
}

.LL-layout {
	width: 1000px;
	/*min-height: 680px;*/
	padding: 15px 0 0 0;
	margin: 0 auto;
	/*background: #437384;*/
}

.label {
	height: 40px;
	line-height: 40px;
	text-align: center;
	font-size: 15px;
	padding: 0px 10px 0px 0px;
}

.title,
.tinyblog,
.classify,
.markblog,
.edit-button {
	margin-bottom: 10px;
}

.borderjus {
	padding: 5px;
	border: 1px solid #ccc;
	border-radius: 3px;
	box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.15) inset;
}

textarea,
.compileM {
	display: inline-block;
	width: 100%;
	height: 500px;
	vertical-align: top;
	box-sizing: border-box;
	padding: 0 20px;
}

textarea {
	border: none;
	border-right: 1px solid #ccc;
	resize: none;
	outline: none;
	background-color: #f6f6f6;
	font-size: 14px;
	font-family: 'Monaco', courier, monospace;
	padding: 20px;
}

code {
	color: #f66;
}

.compileM {
	overflow: auto;
}

.edit-button {
	text-align: center;
}

</style>
