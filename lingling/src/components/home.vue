<template>
	<div id="home">
		<div class="LL-layout">
			<div class="sidebar">
				<sidebar></sidebar>
			</div>
			<div class="main-layout">
				<div class="main-content">
					<div class="carousel">
						<carousel></carousel>
					</div>
					<div class="posts">
						<posts></posts>
					</div>
				</div>
				<div class="main-right">
					<right></right>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import sidebar from './home/sidebar'
import carousel from './common/carousel'
import posts from './common/posts'
import right from './home/right'
export default {
	name: 'home',
	data() {
		return {

		}
	},
	components: {
		'sidebar': sidebar,
		'carousel': carousel,
		'posts': posts,
		'right': right
	},
	created() {
		let _this = this;
		this.$http.get('/api/')
			.then(function(res) {
				if (res.data.checkCode == 1) {
					_this.$router.push('/lingling');
				}
			})
	},
	methods: {

	}
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#home {
	position: absolute;
	width: 100%;
	top: 0;
	left: 0;
	margin: 0;
	padding: 54px 0 0 0;
	background: url(../../static/images/5-150213143516-51.gif) center 0 repeat #b4daf0;
	/*background-size: 100%;*/
	/*background-attachment: fixed;*/
}

.LL-layout {
	width: 1170px;
	min-height: 680px;
	padding: 15px 0 0 0;
	margin: 0 auto;
}

.sidebar {
	position: fixed;
	width: 110px;
	height: 100%;
	margin-right: 30px;
}

.main-layout {
	margin-left: 140px;
	float: left;
	width: 1030px;
}

.main-content {
	float: left;
	width: 660px;
	margin-right: 30px;
}

.main-right {
	width: 340px;
	float: left;
}

</style>
