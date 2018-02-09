<template>
	<div>

		<v-flex xs12 sm5 offset-sm1>
			<h1>Modifier la serie <span class="villeCurrent">{{villeCurrent.city.name}}</span></h1>
		</v-flex>

		<v-layout row wrap>
			<v-flex xs12 sm4 offset-sm1>
				<v-card>
					<v-card-media v-if="this.imageVide" :src="'http://web.geoquizz.local:10085/uploads/'+villeCurrent.image" height="400px"></v-card-media>
					<v-card-media v-else :src="prevImage" height="400px"></v-card-media>
					<v-card-title primary-title>
						<div>
							<h3 class="headline mb-0">
								<span v-if="serie.name.length!==0">{{serie.name}}</span> <span v-else class="villeCurrent">{{villeCurrent.name}}</span>
							</h3>
							<div>
								<span v-if="serie.distance!==null">{{serie.distance}}</span> <span v-else class="villeCurrent">{{villeCurrent.distance}}</span> <span class="unite">(metres)</span>

							</div>
						</div>
					</v-card-title>
				</v-card>
			</v-flex>


			<v-flex xs12 sm5 offset-sm1>
				<form @submit.prevent="saveSerie()">

					<v-text-field color="green" :label="this.label" @click='pickFile' prepend-icon='attach_file'></v-text-field>
					<input type="file"color="green" style="display: none" ref="image" accept="image/x-png,image/gif,image/jpeg" @change="fileChange">

					<v-text-field color="green" type="text" v-model="serie.name" :label="villeCurrent.name"></v-text-field>
					<v-select color="green" :label="villeCurrent.city.name" v-model="serie.city_id" item-value="id" item-text="name" :items="cities"></v-select>
					<v-text-field color="green" type="text" v-model="serie.distance" :label="villeCurrent.distance"></v-text-field>

					<v-btn @click="saveSerie">submit</v-btn>
					<router-link to="/series/all"><v-btn color="red">Cancel</v-btn></router-link>
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
			prevImage: '',
			imageVide : true
		}
	},
	created() {
		this.$store.dispatch('series/getCities').then((res) => {

		}).catch((e) => {
			console.log(e)
		})
	},
	methods: {
		deleteSerie(serie_id){
		},
		pickFile () {
			this.$refs.image.click ()
		},
		fileChange(e){
			this.imageVide=false
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
			this.$store.dispatch('series/patchSerie', this.serie).then((res) => {
				this.$router.push({name: 'series_list'})
			}).catch((e) => {

			})
		},

	},
	computed: {
		...mapGetters({cities: 'series/getCities'}),
		...mapGetters({villeCurrent: 'series/getCurrentSerie'})
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
.villeCurrent{
	color:grey;
}
.imageDefault{
	margin: 0 50px;
}
</style>
