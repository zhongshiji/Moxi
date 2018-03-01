<template>
	<div id="lingling">
		<div class="LL-layout">
			<div class="LL-left">
				<left></left>
			</div>
			<div class="main-layout">
				<div class="blogboard">
					<blogboard></blogboard>
				</div>
				<div class="LL-posts">
					<posts></posts>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import left from './lingling/left'
import posts from './common/posts'
import blogboard from './lingling/blogboard'
export default {
	data() {
		return {

		}
	},
	created() {
		let _this = this;
		this.$http.get('/api/users')
			.then(function(res) {
				if (res.data.checkCode == 0) {
					_this.$router.push('/');
				}
			})
	},
	components: {
		'left': left,
		'posts': posts,
		'blogboard': blogboard
	}
}

</script>
<style scoped>
#lingling {
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
	min-height: 680px;
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

.LL-posts, .blogboard {
	width: 600px;
}

</style>
