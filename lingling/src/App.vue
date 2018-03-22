<template>
	<div id="app">
		<header-view></header-view>
		<router-view></router-view>
	</div>
</template>
<script>
import header from './components/common/header'
export default {
	name: 'app',
	components: {
		'header-view': header
	}
}

</script>
<style>
@import "./assets/icon/iconstyle/style.css";
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	font-size: 14px;
}

.show-content img {
	display: block;
	max-width: 620px;
}

h1 {
	margin: 0;
}

.el-message {
	top: 75px;
}

.el-textarea__inner {
	border: none;
}

.el-upload--picture-card {
	width: 80px;
	height: 80px;
	line-height: 90px;
}

.el-upload-list--picture-card .el-upload-list__item {
	width: 82px;
	height: 82px;
}

.v-modal {
	z-index: 1000 !important;
}

.hiddenIcon .el-upload--picture-card {
	display: none;
} 
</style>
