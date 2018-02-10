<template>
	<div>
		<div>
			<v-btn v-if="isConnected" color="secondary" @click.native="logout">Logout</v-btn>
		</div>
	</div>
</template>

<script>
	
import { mapGetters } from 'vuex'

export default {
	methods: {
		logout() {
			this.$store.dispatch('auth/logout').then(res => {
				this.$router.push({name: 'signin'})
			}).catch(err => {

			})
		}
	},
	computed: {
		...mapGetters({isConnected: 'auth/isConnected'})
	}
}

</script>

<style>
	
</style>