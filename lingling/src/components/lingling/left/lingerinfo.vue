<template>
	<div id="lingerinfo">
		<div class="ll-headshot">
			<img src="../../.././assets/headshot.jpg" title="change your avatar">
		</div>
		<div class="ll-nickname">
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
				nick: 'Er_shenger',
				user: 'lingling'
			},
			introduction: 'In front of you is a beautiful world.',
			email: 'Er_shenger@lingling.com'
		}
	}
}

</script>
<style scoped>
.ll-headshot {
	height: 230px;
}

.ll-headshot img {
	border-radius: 6px;
	height: 230px;
}

.ll-nickname {
	padding: 16px 0;
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
