<template>
	<div>
		<h1>Ajouter une série</h1>


		<v-layout>
	     <v-flex xs12 sm4 offset-sm4>
	       <v-card>
	         <v-card-media ref="prevImage" src="" height="400px">
	         </v-card-media>
	         <v-card-title primary-title>
	           <div>
	             <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
	             <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
	           </div>
	         </v-card-title>
	         <v-card-actions>
	           <v-btn flat color="orange">Share</v-btn>
	           <v-btn flat color="orange">Explore</v-btn>
	         </v-card-actions>
	       </v-card>
	     </v-flex>
	   </v-layout>




		<form @submit.prevent>

			<v-flex class="text-xs-center">
				<v-text-field :label="this.label" @click='pickFile' prepend-icon='attach_file'></v-text-field>
				<input type="file" style="display: none" ref="image" accept="image/x-png,image/gif,image/jpeg" @change="fileChange">
				<v-text-field label="Distance" v-model="serie.distance" required></v-text-field>
				<v-text-field label="Nom de la série" v-model="serie.name" required></v-text-field>
				<v-select :items="cities" label="La ville" item-text="name" item-value="id" v-model="serie.city.id"></v-select>
				<v-btn @click="saveSerie">submit</v-btn>
			</v-flex>

			<div class="previsualisation">
				<v-flex v-show="prevImageBool" class="text-xs-center">
					<h2>Prévisualisation</h2>
					<img ref="prevImage" src="" height="500px">
				</v-flex>
			</div>

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
					distance: null,
					name :"",
					city: {
						id: null
					},
					image: ""
				},
				imageLoaded:false,
				prevImageBool: false
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
					vm.prevImageBool = true
				}
				reader.readAsDataURL(files[0])
			},
			saveSerie() {
				this.$store.dispatch('series/saveSerie', this.serie).then((res) => {
					this.$router.push({name: 'series_list'})
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
.previsualisation{
	margin-top : 50px;
}
h2{
margin-bottom: 20px;
}
img{
	border-radius :5px;
}
</style>
