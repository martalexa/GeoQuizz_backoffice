<template>
	<div>
		<p>Serie details</p>
		<router-view/>
	</div>
</template>

<script>
	import store from '@/store'
	export default {
		beforeRouteEnter (to, from, next) {
			if('id' in to.params){
				//console.log(store.dispatch('series/getSerie',to.params.id))
				store.dispatch('series/getSerie',to.params.id).then((response) => {
					console.log('Success')
					next()
				}).catch((err) => {
					console.log('Failure')
					next({name: 'series_list'})
				})
			}
		}
	}

</script>

<style scoped>
	
</style>