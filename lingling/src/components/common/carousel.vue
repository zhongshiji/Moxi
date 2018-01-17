<template>
	<div id="carousel">
		<el-carousel height="300px">
			<el-carousel-item v-for="(item,index) in details" :key="index">
				<h3>{{ item.description }}</h3>
			</el-carousel-item>
		</el-carousel>
	</div>
</template>
<script>
export default {
	data() {
		return {
			details: [
				{ description: '小红莓乐队主唱去世 王菲曾翻唱其歌曲'},
				{ description: '法国摄影师在青海杂多拍摄到小雪豹"写真"'},
				{ description: '菲律宾马荣火山喷发 熔岩成河上万人撤离'},
				{ description: '"桑吉"轮漏油扩散 油污带已达58平方公里'}
			]
		}
	}
}

</script>
<style scoped>
.el-carousel__item h3 {
	color: #fff;
	font-size: 18px;
	font-weight: lighter;
	line-height: 520px;
	margin: 0 15px;
}

.el-carousel__item:nth-child(3) {
	background: url('../../assets/carouselImage/0001.jpg');
	background-color: #99a9bf;
}

.el-carousel__item:nth-child(4) {
	background: url('../../assets/carouselImage/0002.jpg');
	background-color: #d3dce6;
}

.el-carousel__item:nth-child(5) {
	background: url('../../assets/carouselImage/0003.jpg');
	background-color: #99a9bf;
}

.el-carousel__item:nth-child(6) {
	background: url('../../assets/carouselImage/0004.jpg');
	background-color: #d3dce6;
}

</style>
