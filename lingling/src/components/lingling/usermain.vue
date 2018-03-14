<template>
	<div id="changeinfo">
		<div class="LL-layout">
			<div class="LL-left">
				<left :author="this.authorname"></left>
			</div>
			<div class="main-layout">
				<div class="LL-posts">
					<posts :author="this.author" class="posts-style"></posts>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import left from './left'
import posts from '../common/posts'
export default {
	data() {
		return {
			author: JSON.parse(localStorage.getItem('userDetail'))._id,
			authorname: ''
		}
	},
	methods: {
		
	},
	created () {
    if (this.$route.query.author) {
			this.author = this.$route.query.author
			this.authorname = this.$route.query.authorname
		}
	},
	components: {
		'left': left,
		'posts': posts
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

.LL-posts {
	width: 600px;
}

.posts-style {
	margin-top: 0 !important;
}
</style>
