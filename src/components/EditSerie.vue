<template>
	<div>
		<h1>Modifier une serie</h1>
		<form @submit.prevent="saveSerie()">

			<v-text-field :label="this.label" @click='pickFile' prepend-icon='attach_file'></v-text-field>
			<input type="file" style="display: none" ref="image" accept="image/x-png,image/gif,image/jpeg" @change="fileChange">

			<v-text-field type="text" v-model="serie.distance" placeholder="Distance" required></v-text-field>
			<v-text-field type="text" v-model="serie.name" placeholder="Type de lieu (ex: places, musées...)" required></v-text-field>


	<!-- <v-select :items="cities" label="La ville" item-text="name" item-value="id" v-model="serie.city.id"></v-select>-->

			<select v-model="serie.city_id">
				<option value="" selected>La ville</option>
				<option v-for="city in cities" :value="city.id">{{city.name}}</option>
			</select>

			<v-select label="Ville" item-text="name" v-model="select" :items="cities"></v-select>

			<v-btn @click="saveSerie">submit</v-btn>
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
				},
				label : 'photo'
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
			pickFile () {
            this.$refs.image.click ()
        },
			fileChange(e){
				let files = e.target.files || e.dataTransfer.files
				if(!files.length)
					return
				let image = new Image()
				this.label = files[0].name
				let reader = new FileReader()

				let vm = this

				reader.onload = (e) => {
					vm.serie.image = e.target.result
					vm.serie.image = vm.serie.image.split(',')[1]
					vm.$refs.prevImage.src = e.target.result
					vm.prevImageBool = true
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
