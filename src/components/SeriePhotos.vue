<template>
	<v-container grid-list-md text-xs-center>
        <form>
            <input type="file" name="image" accept="image/x-png,image/gif,image/jpeg" @change="onFileChange"/>
            <v-text-field label="Description" v-model="description" required></v-text-field>
            <v-text-field label="Latitude" v-model="lat" required></v-text-field>
            <v-text-field label="Longitude" v-model="lng" required></v-text-field>
            <v-text-field label="Serie Id" v-model="serie_id" required></v-text-field>
            <v-btn @click="submit">submit</v-btn>
            <v-btn @click="clear">clear</v-btn>
        </form>
    </v-container>
</template>

<script>

export default {
	name: 'serie_photo',
		data () {
		return {
            image: '',
            lat: '',
            lng: '',
            serie_id: '',
            description: '',
            photo: ''
		}
	},
	mounted (){

	},
	methods:{
        clear(){
            this.image = ''
        },
        submit(){
            /*window.axios.post('photo', {
                description: this.description,
                photo: this.photo,
                lat: this.lat,
                lng: this.lng,
                serie_id: this.serie_id
            }).then(res =>{
                console.log(res)
            }).catch(err=>{
                console.log(err)
            })*/
        },
        onFileChange(e) {
            // var files = e.target.files || e.dataTransfer.files;
            // if (!files.length)
            //     return;
			// this.createImage(files[0]);
			let files = e.target.files || e.dataTransfer.files
			if(!files.length)
				return;
			let image = new Image()
			let reader = new FileReader()

			let vm = this

			reader.onload = (e) => {
				vm.serie.image = e.target.result
				vm.serie.image = vm.serie.image.split(',')[1]
				console.log(vm.serie)
			}
			reader.readAsDataURL(files[0])
		}
		// ,
        // createImage(file) {
        //     var image = new Image()
        //     var reader = new FileReader()
        //     var vm = this

        //     reader.onload = (e) => {
        //         vm.photo = e.target.result
        //         vm.photo = vm.photo.split(',')[1]
        //         console.log('Image')
        //         console.log(vm.photo)
        //     }
        //     reader.readAsDataURL(file)
        //     //this.photo = document.querySelector("#image").src.split(',')[1]
        // }
	}
}

</script>

<style scoped>
	
</style>