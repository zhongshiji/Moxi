<template>
	<div id="lingerinfo">
		<div class="ll-headshot" @click="toUserMain">
			<img :src="imageUrl" title="change your avatar">
		</div>
		<div class="ll-nickname" @click="toChangeInfo">
			<h1>
				<span class="ll-nick">{{ this.nickname.nick }}</span>
				<span class="ll-user">{{ this.nickname.user }}</span>
			</h1>
		</div>
		<div class="ll-note">
			<div>{{ this.introduction }}</div>
		</div>
		<div class="ll-email">
			<i class="el-icon-message"></i>
			<span class="adorn">{{ this.email }}</span>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			nickname: {
				nick: '',
				user: JSON.parse(localStorage.getItem('user')).username
			},
			email: '',
			imageUrl: '',
			introduction: ''
		}
	},
	created() {
		let _this = this;
		this.$http.get('api/users/userinfo')
			.then(function(res) {
				if (!res.data.nickname) {
					_this.nickname.nick = '泠泠用户';
					_this.email = '点击用户名填写email信息';
					_this.introduction = '这个人很懒，什么都没有留下。';
				} else {
					_this.nickname.nick = res.data.nickname;
					_this.nickname.user = res.data.username;
					_this.email = res.data.email;
					_this.introduction = res.data.introduction;
				}
			});
		this.$http.get('api/users/userinfo')
			.then(function(res) {
				if (!res.data.imageUrl) {
					_this.imageUrl = 'static/images/headshot.jpg';
				} else {
					_this.imageUrl = res.data.imageUrl;
				}
			})
	},
	methods: {
		toUserMain () {
			this.$router.push('/lingling/usermain')
		},
		toChangeInfo () {
			this.$router.push('/lingling/changeinfo')
		}
	}
}

</script>
<style scoped>
.ll-headshot {
	height: 230px;
	cursor: pointer;
}

.ll-headshot img {
	border-radius: 6px;
	width: 230px;
	height: 230px;
}

.ll-nickname {
	padding: 16px 0;
	cursor: pointer;
}

.ll-nick {
	display: block;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
	font-size: 26px;
	font-weight: 600;
	color: #24292e;
}

.ll-user {
	display: block;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
	font-size: 20px;
	font-weight: lighter;
	font-style: italic;
	color: rgb(102, 102, 102);
}

.ll-note {
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
	font-size: 14px;
	color: #6a737d;
	margin-bottom: 12px;
}

.ll-email {
	padding: 16px 0;
	border-top: solid #e1e4e8 1px;
}

.el-icon-message {
	margin-right: 1px;
}

.ll-email .adorn {
	color: #0366d6;
	cursor: pointer;
}

</style>
