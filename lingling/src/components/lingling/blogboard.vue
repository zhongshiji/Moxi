<template>
	<div id="blogboard">
		<div class="board-lay">
			<div class="ll-tip">
				<p><i class="icon-leaf el-icon--left"></i>在~这儿~编辑您的博客吧~</p>
			</div>
			<div class="title">
				<el-input v-model="title" placeholder=" 请输入标题"></el-input>
			</div>
			<div class="input">
				<el-input type="textarea" :autosize="{ minRows: 3, maxRows: 8 }" placeholder="请输入简要内容" resize="none" v-model="content">
				</el-input>
			</div>
			<div class="classify">
				<el-popover ref="popover1" v-model="visible1">
					<el-select v-model="classify" multiple collapse-tags placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-popover>
				<el-button v-popover:popover1 type="text"><i class="icon-attachment"></i>
					<div class="button-font">分类</div>
				</el-button>
			</div>
			<div class="imgs-upload">
				<el-popover ref="popover2" v-model="visible2" width="278">
					<p style="font-weight: 700;margin: 7px 8px">本地上传</p>
					<div style="margin-left: 8px">
						<el-upload :limit="9" name="imageUpload" action="api/posts/upload" list-type="picture-card" :on-preview="handleImagesPreview" :on-remove="handleImagesRemove" :on-success="handleImagesSuccess" :class="{ hiddenIcon: visible3 }">
							<i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</div>
				</el-popover>
				<el-button v-popover:popover2 type="text"><i class="icon-image el-icon--left"></i>
					<div class="button-font">图片</div>
				</el-button>
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
			visible1: false,
			visible2: false,
			visible3: false,
			dialogImageUrl: '',
			dialogVisible: false,
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
			imageUrls: [],
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

			if (!this.nickname) {
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
				imageUrls: this.imageUrls,
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
			this.$router.push({ name: 'blogedit', params: { title: this.title, content: this.content, classify: this.classify, imageUrls: this.imageUrls } })
			// Bus.$emit('getTarget', this.title)
		},
		handleImagesRemove(file, fileList) {
			if (fileList.length < 9) {
				this.visible3 = false;
			}
		},
		handleImagesPreview(file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},
		handleImagesSuccess(response, file, fileList) {
			if (fileList.length == 9) {
				this.visible3 = true;
			}
			this.imageUrls.push(response.imageUrl)
		}
	}
}

</script>
<style scoped>
.board-lay {
	border: solid 1px #93d0b3;
	border-radius: 3px;
	padding: 15px 10px 10px;
	background: #fff;
}

.ll-tip p {
	margin: 0;
	padding: 0 0 8px 0;
	color: #eb7350;
	font-size: 16px;
	font-weight: 600;
	font-style:oblique
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
	margin-right: 35px;
}

.imgs-upload {
	float: left;
	margin-right: 35px;
}

.classify .el-button--text,
.imgs-upload .el-button--text {
	display: inline-block;
	color: #2c3e50;
	font-size: 10px;
	padding-bottom: 5px;
}

.classify .el-button--text:hover,
.imgs-upload .el-button--text:hover {
	color: #2aa957;
}

.classify i {
	color: #ffa405;
	font-size: 20px;
}

.imgs-upload i {
	color: #39a175;
	font-size: 20px;
}

.ll-button {
	float: right;
}

.clear {
	clear: both;
}

.button-font {
	display: inline-block;
	position: absolute;
	margin-top: 5px;
	/*margin-right: 10px;*/
}

</style>
