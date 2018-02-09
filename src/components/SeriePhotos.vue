<template>
	<div>
		<v-container grid-list-md text-xs-center>
			<form>
				<input type="file" name="image" accept="image/x-png,image/gif,image/jpeg" @change="onFileChange"/>
				<v-text-field label="Description" v-model="newPhoto.description"></v-text-field>
				<div class="column container" id="carte">
					<div class="carte">
						<!-- Map -->
						<v-map ref="map" :zoom="current_serie.city.zoom_level" :center="[current_serie.city.lat, current_serie.city.lng]">
							<v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
						</v-map>
						<!-- End Map -->
					</div>
				</div>
				<v-dialog id="dialog" v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <h2>La photo a bien était rajoutée</h2>
        </v-card-title>
        <v-card-text>
         <v-btn @click="newMarker()"><v-icon>add_a_photo</v-icon> autre photo</v-btn>
         <v-btn @click="redirect()">Fin</v-btn>
       </v-card-text>
     </v-card>
   </v-dialog>
				<v-btn @click="submit">submit</v-btn>
				<router-link to="/series/all"><v-btn color="red">Cancel</v-btn></router-link>
			</form>
		</v-container>
	</div>
</template>

<script>
import Vue from 'vue'
import Vue2Leaflet from 'vue2-leaflet'

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

Vue.component('v-map', Vue2Leaflet.Map);
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer);
Vue.component('v-marker', Vue2Leaflet.Marker);
import { mapGetters } from 'vuex'
export default {
	name: 'serie_photo',
		data () {
		return {
			dialog : false,
			newPhoto: {
				lat: '',
				lng: '',
				description: '',
				photo: ''
			},
			selectedPosition: {
				lat: null,
				lng: null
			},
			marker: null
		}
	},
	created(){

	},
	mounted (){

		this.$refs.map.mapObject.on('click', e => {
			if(this.marker !== null){
				this.$refs.map.mapObject.removeLayer(this.marker)
			}
			this.newPhoto.lat = e.latlng.lat
			this.newPhoto.lng = e.latlng.lng
			this.marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.$refs.map.mapObject);
		})
	},
	methods:{

        submit(){
			this.$store.dispatch('series/addPhoto', this.newPhoto).then((res) => {

				this.dialog=true

			}).catch((e) => {
				console.log(e)
			})
        },
        onFileChange(e) {
			let files = e.target.files || e.dataTransfer.files
			if(!files.length)
				return;
			let image = new Image()
			let reader = new FileReader()

			let vm = this

			reader.onload = (e) => {
				vm.newPhoto.photo = e.target.result
				vm.newPhoto.photo = vm.newPhoto.photo.split(',')[1]
			}
			reader.readAsDataURL(files[0])
		},
		newMarker() {
			this.newPhoto.lat=""
			this.newPhoto.lng=""
			this.newPhoto.description=""
			this.newPhoto.photo=""
			this.selectedPosition.lat =null
			this.selectedPosition.lng=null
			this.marker.remove()
			this.marker=null
			this.dialog=false
		},
		redirect() {
			this.$router.push({name: 'series_list'})
		}
	},
	computed : {
		...mapGetters({current_serie: 'series/getCurrentSerie'})
	}
}

</script>

<style scoped>
	.carte{
		border :1px solid black;
		height:70vh;
	}
	#carte{
  		z-index:1;
	}

	#dialog {
		z-index:999;
	}
</style>
