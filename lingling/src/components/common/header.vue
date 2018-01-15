<template>
	<el-header>
		<el-row type="flex" justify="start" :gutter="20">
			<el-col :span="6">
				<div class="logo grid-content"></div>
			</el-col>
			<el-col :span="6" :offset="6">
				<div class="grid-content bg-purple">xx</div>
			</el-col>
		</el-row>
	</el-header>
</template>
<script>
export default {

}

</script>
<style scoped>
.el-header {
	position: fixed;
	width: 100%;
	top: 0;
	left: 0;
	background-color: #B3C0D1;
	color: #333;
	text-align: center;
	line-height: 60px;
}

.el-row {
	&:last-child {
		margin-bottom: 0;
	}
}

.el-col {
	border-radius: 4px;
}

.logo {
	height: 100%;
	background-image: url("../../assets/logo.png");
}

.bg-purple {
	background: #d3dce6;
}

.grid-content {
	border-radius: 4px;
	min-height: 36px;
}

.row-bg {
	padding: 10px 0;
	background-color: #f9fafc;
}

</style>
