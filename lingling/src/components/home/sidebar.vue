<template>
	<div id="sidebar">
		<div>
			<el-button v-for="item,index in classify" :key="index" @click="remainstyle(index)">{{ item.name }}</el-button>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			classify: [
				{ name: '热门' },
				{ name: '明星' },
				{ name: '全球' },
				{ name: '新鲜事' },
				{ name: '搞笑' },
				{ name: '社会' },
				{ name: '情感' },
				{ name: '时尚' },
				{ name: '军事' },
				{ name: '美女' },
				{ name: '体育' },
				{ name: '动漫' }
			]
		}
	},
	methods: {
		remainstyle(index) {
			let type = this.classify[index].name
			console.log(type)
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
