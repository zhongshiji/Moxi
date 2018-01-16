<template>
	<div id="right">
		<div class="login">
			<login></login>
		</div>
	</div>
</template>

<script>
import login from '../common/right/login.vue'
export default {
	data () {
		return {

		}
	},
	components: {
		'login': login
	}
}
</script>

<style scoped>
	
</style>