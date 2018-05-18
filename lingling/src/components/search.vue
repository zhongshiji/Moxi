<template>
	<div id="search">
		<div class="LL-layout">
			<div class="main-layout">
				<div class="LL-posts">
					<posts :search="this.search" class="posts-style"></posts>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import posts from './common/posts'
export default {
	data() {
		return {
			search: '',
		}
	},
	methods: {
		
	},
	created () {
		this.search = this.$route.params.search
	},
	components: {
		'posts': posts
	}
}

</script>
<style scoped>
#search {
	position: absolute;
	width: 100%;
	top: 0;
	left: 0;
	margin: 0;
	padding: 54px 0 0 0;
	/*background: #983838;*/
	background: url(../../static/images/5-150213143516-51.gif) center 0 repeat #b4daf0;
}

.LL-layout {
	margin: 0 auto;
	padding-top: 20px;
	padding-bottom: 40px;
	width: 620px;
	min-height: 620px;
}

.main-layout {
	width: 100%;
}

.LL-posts {
	width: 100%;
}

.posts-style {
	margin-top: 0 !important;
}
</style>
