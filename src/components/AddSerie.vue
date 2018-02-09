<template>
	<div>
		<h1>Ajouter une série</h1>



		<v-layout>

		<v-flex xs12 sm4 offset-sm1>
				<v-card>
					<v-card-media :src="prevImage" height="400px"></v-card-media>
						<v-card-title primary-title>
						 <div>
							 <h3 class="headline mb-0">
							 	<span v-if="serie.name.length!==0">{{serie.name}}</span> <span v-else class="villeCurrent">Places, parcs ...</span>
								</h3>
							 <div>
							 <span v-if="serie.distance!==null">{{serie.distance}}</span> <span v-else class="villeCurrent">Distance</span> <span class="unite">(metres)</span>
							</div>
						 </div>
					 </v-card-title>
				 </v-card>
			</v-flex>


 <v-flex xs12 sm5 offset-sm1>
		<form @submit.prevent>
			<v-flex class="text-xs-center">

				<v-text-field :label="this.label" @click='pickFile' prepend-icon='attach_file'></v-text-field>
				<input type="file" style="display: none" ref="image" accept="image/x-png,image/gif,image/jpeg" @change="fileChange">

				<v-text-field label="Type de lieu" v-model="serie.name"></v-text-field>
				<v-select :items="cities" label="La ville" item-text="name" item-value="id" v-model="serie.city.id"></v-select>
				<v-text-field label="Distance" v-model="serie.distance"></v-text-field>

				<v-btn @click="saveSerie">submit</v-btn>
			</v-flex>
		</form>
		</v-flex>

		</v-layout>
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
				prevImageBool: false,
				prevImage: ''
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
					return
				let image = new Image()
				this.label = files[0].name
				let reader = new FileReader()

				let vm = this

				reader.onload = (e) => {
					vm.prevImage = e.target.result
					vm.serie.image = e.target.result
					vm.serie.image = vm.serie.image.split(',')[1]

					vm.prevImageBool = true
					console.log(vm.serie)
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
.villeCurrent{
	color:grey;
}
.unite{
	color:grey;
	margin-left : 5px;
	font-size:0.85em;
}
</style>
