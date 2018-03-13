<template>
	<div id="changeinfo">
		<div class="LL-layout">
			<div class="LL-left">
				<left></left>
			</div>
			<div class="main-layout">
				<div class="rewrite">
					<div class="title">
						<h2 class="Subhead-heading">修改个人资料</h2>
					</div>
					<div class="ll-headshot">
						<el-form enctype="multipart/form-data" method="post">
							<el-upload class="avatar-uploader" name="avatarUpload" action="api/users/upload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
								<img v-if="headUrl" :src="headUrl" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form>
					</div>
					<div class="ll-form">
						<el-form ref="form" :model="form" label-width="100px" enctype="multipart/form-data">
							<!-- <el-form-item label="用户头像：">
								<el-upload class="avatar-uploader" action="api/users/userinfo" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
									<img v-if="headUrl" :src="headUrl" class="avatar">
									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
							</el-form-item> -->
							<el-form-item label="昵称：">
								<el-input v-model="form.nickname" style="width: 400px"></el-input>
							</el-form-item>
							<el-form-item label="性别：">
								<el-select v-model="form.gender" placeholder="请选择">
									<el-option label="男" value="m"></el-option>
									<el-option label="女" value="f"></el-option>
									<el-option label="保密" value="x"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="邮箱：">
								<el-input v-model="form.email" style="width: 217px"></el-input>
							</el-form-item>
							<el-form-item label="个人简介：">
								<el-input v-model="form.introduction" style="width: 400px"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="onSubmit">确认修改</el-button>
							</el-form-item>
						</el-form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import left from './left'
export default {
	data() {
		return {
			headUrl: '',
			form: {
				nickname: '',
				gender: '',
				email: '',
				introduction: ''
			}
		}
	},
	methods: {
		onSubmit() {
			let _this = this;
			this.$http.post('/api/users/changeinfo', {
				username: JSON.parse(localStorage.getItem('user')).username,
				form: _this.form
			}).then(function(res) {
				location.reload()
			})
		},
		handleAvatarSuccess(res, file) {
			let _this = this;
			// this.headUrl = URL.createObjectURL(file.raw);
			this.headUrl = res.headUrl;
			this.$http.post('/api/users/changeAvatar', {
				headUrl: this.headUrl
			}).then(function (res) {
				location.reload()
			})
		},
		beforeAvatarUpload(file) {
			const isJPG = file.type === 'image/jpeg';
			const isLt2M = file.size / 1024 / 1024 < 2;

			if (!isJPG) {
				this.$message.error('上传头像图片只能是 JPG 格式!');
			}
			if (!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!');
			}
			return isJPG && isLt2M;
		}
	},
	components: {
		'left': left
	}
}

</script>
<style scoped>
#changeinfo {
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

.LL-left {
	float: left;
	width: 250px;
}

.main-layout {
	float: left;
	width: 750px;
}

.ll-form {
	float: left;
	width: 500px;
}

.title {
	border-bottom: 1px #e1e4e8 solid;
	margin-bottom: 20px;
}

h2 {
	margin-bottom: 0;
	margin-top: 0;
	/*font-size: 18px;*/
	font-weight: 600;
}

.ll-headshot {
	float: right;
}

.ll-headshot {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}

.ll-headshot:hover {
	border-color: #409EFF;
}

.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	line-height: 178px;
	text-align: center;
}

.avatar {
	width: 178px;
	height: 178px;
	display: block;
}

</style>
