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
				{ name: '热门', value: 'Hots' },
				{ name: '明星', value: 'Stars' },
				{ name: '全球', value: 'World' },
				{ name: '新鲜事', value: 'News' },
				{ name: '搞笑', value: 'Amuse' },
				{ name: '社会', value: 'Society' },
				{ name: '情感', value: 'Emotions' },
				{ name: '时尚', value: 'Fashions' },
				{ name: '军事', value: 'Military' },
				{ name: '美女', value: 'Beauty' },
				{ name: '体育', value: 'Sports' },
				{ name: '动漫', value: 'Anime' }
			]
		}
	},
	methods: {
		remainstyle(index) {
			let type = this.classify[index].value
			if (type == 'Hots') {
				this.$router.push('/')
				return
			}
			location.reload()
			this.$router.push(`/home/${ type }`)
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
