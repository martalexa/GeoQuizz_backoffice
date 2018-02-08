<template>
	<div>
		<p>Serie details</p>
		<router-view></router-view>
	</div>
</template>

<script>
	import store from '@/store'
	export default {
		beforeRouteEnter (to, from, next) {
			if('id' in to.params){
				store.dispatch('series/getSerie',to.params.id).then((response) => {
					console.log('Success')
					next()
				}).catch((err) => {
					next({name: 'series_list'})
				})
			}
		}
	}

</script>

<style scoped>
	
</style>