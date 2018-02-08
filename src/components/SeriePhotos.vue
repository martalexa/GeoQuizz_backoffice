<template>
	<div>
		<v-container grid-list-md text-xs-center>
			<form>
				<input type="file" name="image" accept="image/x-png,image/gif,image/jpeg" @change="onFileChange"/>
				<v-text-field label="Description" v-model="newPhoto.description"></v-text-field>
				<v-text-field label="Latitude" v-model="newPhoto.lat" required></v-text-field>
				<v-text-field label="Longitude" v-model="newPhoto.lng" required></v-text-field>
				<v-btn @click="submit">submit</v-btn>
				<v-btn @click="clear">clear</v-btn>
			</form>
		</v-container>
		<div class="column container" id="carte">
			<div class="carte">
				<!-- Map -->
				<v-map ref="map" :zoom="13" :center="[48.6843900, 6.1849600]">
					<v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
					<v-marker :lat-lng="[48.6843900, 6.1849600]"></v-marker>
				</v-map>
				<!-- End Map -->
			</div>
		</div>
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

export default {
	name: 'serie_photo',
		data () {
		return {
			newPhoto: {
				lat: '',
				lng: '',
				description: '',
				photo: ''
			},
			selectedPosition: {
				lat: null,
				lng: null
			}
		}
	},
	created(){
		//let markerGroup = L.layerGroup().addTo(this.$refs.map);
	},
	mounted (){
		//L.marker([50.5, 30.5]).addTo(this.$refs.map.mapObject);
		this.$refs.map.mapObject.on('click', e => {
			//markerGroup.removeLayer(219)
			console.log(e)
			this.selectedPosition.lat =e.latlng.lat
			this.selectedPosition.lng = e.latlng.lng
			L.marker([this.selectedPosition.lat, this.selectedPosition.lng]).addTo(this.$refs.map.mapObject)
		})
	},
	methods:{
        clear(){
            //this.image = ''
        },
        submit(){
			this.$store.dispatch('series/addPhoto', this.newPhoto).then((res) => {
				
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
		}
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
</style>