<template>
	<div>
		<h1 class="text-xs-center">Liste des séries <router-link to="/series/add"><v-icon color="light-green darken-1">add_circle</v-icon></router-link></h1>
	</br>

	<v-layout row wrap>
		<v-flex xs12 xl6 offset-xl3>
			<table class="table is-striped">
				<thead>
					<tr>
						<th>Nom</th>
						<th>Distance (m)</th>
						<th>Nom de la ville</th>
						<th>Modifications</th>
					</tr>
				</thead>
				<tbody v-for="serie in series">
					<tr>
						<td class="text-xs-center"><b>{{serie.name}}</b></td>
						<td class="text-xs-center">{{serie.distance}}</td>
						<td class="text-xs-center">{{serie.city.name}}</td>
						<td class="text-xs-center">
							<button @click="deleteSerie(serie.id)"><v-icon color="red darken-1">delete_forever</v-icon></button>
							<router-link :to="{name: 'serie_photos', params: {id: serie.id}}" ><button><v-icon color="light-green darken-1">add_a_photo</v-icon></button></router-link>
							<router-link :to="{name: 'edit_serie', params: {id: serie.id}}"><button><v-icon color="orange lighten-3">mode_edit</v-icon></button></router-link>
							<router-link :to="{name: 'serie_rules', params: {id: serie.id}}"><button><v-icon color="cyan lighten-1">playlist_add</v-icon></button></router-link>
						</td>
					</tr>
				</tbody>
			</table>
		</v-flex>
	</v-layout>

</div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
	data() {
		return {

		}
	},
	created() {
		this.$store.dispatch('series/getSeries').then((res) => {
			console.log('Res')
			console.log(res)
		}).catch((e) => {
			console.log('Err')
			console.log(e)
		})
	},
	methods: {
		deleteSerie(serie_id){

		},
		modify(){
			this.$router.push({name:'serie'})
		}
	},
	computed: {
		...mapGetters({series: 'series/getSeries'})
	}
}
</script>

<style scoped>

</style>
