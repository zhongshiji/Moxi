<template>
	<div id="sidebar">
		<div @click="remainstyle">
			<el-button>热门</el-button>
			<el-button>明星</el-button>
			<el-button>头条</el-button>
			<el-button>新鲜事</el-button>
			<el-button>搞笑</el-button>
			<el-button>社会</el-button>
			<el-button>情感</el-button>
			<el-button>时尚</el-button>
			<el-button>军事</el-button>
			<el-button>美女</el-button>
			<el-button>体育</el-button>
			<el-button>动漫</el-button>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {

		}
	},
	methods: {
		remainstyle() {

		}
	}
}

</script>
<style scoped>
.el-button {
	color: #333;
	font-size: 18px;
	width: 100%;
	margin: 0 0 3px 0;
	border: none;
}

.el-button:hover {
	background-color: #39a175;
}

</style>
