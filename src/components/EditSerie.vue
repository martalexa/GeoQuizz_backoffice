<template>
	<div>
		<h1>Modifier une serie</h1>
		<form @submit.prevent="saveSerie()">
			<input type="file" accept="image/x-png,image/gif,image/jpeg" @change="fileChange">
			<input type="text" v-model="serie.distance" placeholder="Distance">
			<input type="text" v-model="serie.name" placeholder="Type de lieu (ex: places, musées...)">
			<select v-model="serie.city_id">
				<option value="" selected>La ville</option>
				<option v-for="city in cities" :value="city.id">{{city.name}}</option>
			</select>
			<button type="submit">Submit</button>
		</form>
	</div>
</template>

<script>

	import { mapGetters } from 'vuex'

	export default {
		data() {
			return {
				serie: {
					distance: null,
					city_id: null,
					image: "",
					name : ""
				}
			}
		},
		created() {
			/*this.$store.dispatch('series/getCities').then((res) => {

			}).catch((e) => {
				console.log(e)
			})*/
		},
		methods: {
			deleteSerie(serie_id){

			},
			fileChange(e){
				let files = e.target.files || e.dataTransfer.files
				if(!files.length)
					return
				let image = new Image()
				let reader = new FileReader()

				let vm = this

				reader.onload = (e) => {
					vm.serie.image = e.target.result
					vm.serie.image = vm.serie.image.split(',')[1]
					console.log(vm.serie)
				}
				reader.readAsDataURL(files[0])
			},
			saveSerie() {
				this.$store.dispatch('series/patchSerie', this.serie).then((res) => {
					this.$router.push({name: 'series_list'})
				}).catch((e) => {

				})
			},

		},
		computed: {
		...mapGetters({cities: 'series/getCities'})
		}
	}
</script>

<style scoped>

</style>
