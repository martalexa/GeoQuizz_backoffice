<template>
	<div>
		<v-container grid-list-md text-xs-center>
			<form>
				<input type="file" name="image" accept="image/x-png,image/gif,image/jpeg" @change="onFileChange"/>
				<v-text-field label="Description" v-model="newPhoto.description"></v-text-field>
				<div class="column container" id="carte">
					<div class="carte">
						<!-- Map -->
						<v-map ref="map" :zoom="13" :center="[48.6843900, 6.1849600]">
							<v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
						</v-map>
						<!-- End Map -->
					</div>
				</div>
				<v-btn @click="submit">submit</v-btn>
				<v-btn @click="clear">clear</v-btn>
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
			},
			marker: null
		}
	},
	created(){
		//let markerGroup = L.layerGroup().addTo(this.$refs.map);
	},
	mounted (){
		//L.marker([50.5, 30.5]).addTo(this.$refs.map.mapObject);
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
        clear(){
            //this.image = ''
        },
        submit(){
			this.$store.dispatch('series/addPhoto', this.newPhoto).then((res) => {
				this.$router.push({name: 'series_list'})
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
