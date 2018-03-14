<template>
	<div id="left">
		<div class="lingerinfo">
			<lingerinfo :author="this.author"></lingerinfo>
		</div>
	</div>
</template>
<script>
import lingerinfo from './left/lingerinfo'
export default {
	data() {
		return {

		}
	},
	components: {
		'lingerinfo': lingerinfo
	},
	props: [
		'author'
	]
}

</script>
<style scoped>
#left {
	padding: 0 10px;
}

</style>
