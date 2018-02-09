<template>
	<div>

		<v-flex xs12 sm5 offset-sm1>
			<h1>Modifier une serie</h1>
		</v-flex>

			<v-layout row wrap>
				<v-flex xs12 sm4 offset-sm1>
		       <v-card>
		         <v-card-media ref="prevImage" src="" height="400px">
		         </v-card-media>
		         <v-card-title primary-title>
		           <div>
		             <h3 class="headline mb-0">{{typeBind}} - {{villeBind.name}} </h3>
		             <div>{{distanceBind}} <span class="unite">(metres)</span></div>
		           </div>
		         </v-card-title>
		       </v-card>
				</v-flex>





		  <v-flex xs12 sm5 offset-sm1>
			<form @submit.prevent="saveSerie()">


	<!--	<select v-model="serie.city_id">
					<option value="" selected>La ville</option>
					<option v-for="city in cities" :value="city.id">{{city.name}}</option>
				</select> -->

				<v-text-field type="text" v-model="typeBind" placeholder="Type de lieu (ex: places, musées...)" required ></v-text-field>
				<v-select label="Ville" v-model="villeBind" item-text="name" :items="cities"></v-select>
				<v-text-field type="text" v-model="distanceBind" placeholder="Distance" required></v-text-field>

				<v-text-field :label="this.label" @click='pickFile' prepend-icon='attach_file'></v-text-field>
				<input type="file" style="display: none" ref="image" accept="image/x-png,image/gif,image/jpeg" @change="fileChange">






				<v-btn @click="saveSerie">submit</v-btn>
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
				serie: {
					distance: null,
					city_id: null,
					image: "",
					name : "",
				},
				label : 'photo',
				distanceBind :"",
				typeBind:"",
				villeBind:""
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
.unite{
	color:grey;
	margin-left : 5px;
	font-size:0.85em;
}
h1{
	margin-left:50px;
	margin-bottom :20px
}
</style>
