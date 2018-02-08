<template>
	<div>
		<h1>Add new serie</h1>
		<form @submit.prevent="">
			<v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
				<v-text-field :label="this.label" @click='pickFile' prepend-icon='attach_file'></v-text-field>
				<input
					type="file"
					style="display: none"
					ref="image"
					accept="image/x-png,image/gif,image/jpe"
					@change="fileChange"
				>
				<v-text-field label="Distance" v-model="serie.distance" required></v-text-field>
				<v-text-field label="Nom de la série" v-model="serie.name" required></v-text-field>
				<v-select :items="cities" label="La ville" item-text="name" item-value="id" v-model="serie.city.id"></v-select>
				<v-btn @click="saveSerie">submit</v-btn>
			</v-flex>
			
		</form>
	</div>
</template>

<script>

	import { mapGetters } from 'vuex'

	export default {
		data() {
			return {
				label: 'Une Image',
				serie: {
					name: null,
					distance: null,
					name :"",
					city: {
						id: null
					},
					image: ""
				},
				imageLoaded:false
			}
		},
		created() {
			this.$store.dispatch('series/getCities').then((res) => {

			}).catch((e) => {
				console.log(e)
			})
		},
		methods: {
			pickFile () {
            this.$refs.image.click ()
        },
			deleteSerie(serie_id){

			},
			fileChange(e){
				let files = e.target.files || e.dataTransfer.files
				
				if(!files.length)
					return;
				this.label = files[0].name
				let image = new Image()
				let reader = new FileReader()

				let vm = this
				reader.onload = (e) => {
					vm.serie.image = e.target.result
					vm.serie.image = vm.serie.image.split(',')[1]
					vm.$refs.prevImage.src = e.target.result
				}
				reader.readAsDataURL(files[0])
			},
			saveSerie() {
				this.$store.dispatch('series/saveSerie', this.serie).then((res) => {
					this.$router.push({name: 'series'})
				}).catch((e) => {

				})
			}
		},
		computed: {
			...mapGetters({cities: 'series/getCities'})
		}
	}
</script>

<style scoped>

</style>
