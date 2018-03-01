<template>
	<div id="left">
		<div class="lingerinfo">
			<lingerinfo></lingerinfo>
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
	}
}

</script>
<style scoped>
#left {
	padding: 0 10px;
}

</style>
