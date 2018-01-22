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
import sidebar from './common/sidebar'
import carousel from './common/carousel'
import posts from './common/posts'
import right from './common/right'
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
		this.$http.get('/api/', {
			params: {
				ID: 123456
			}
		}).then(function(res) {
			console.log(res.data.welcome);
		})
	},
	methods: {

	}
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#home {
	width: 100%;
	margin: 0;
	padding: 0;
	top: 0;
	left: 0;
	position: absolute;
	padding: 60px 0 0 0;
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
