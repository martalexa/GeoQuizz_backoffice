<template>
	<div>
		<h1>Series List! <router-link to="/series/add">Add new</router-link></h1>
		<table>
			<tbody>
				<th>Name</th>
				<th>Distance</th>
				<th>City</th>
				<th>Actions</th>
				<tr v-for="serie in series">
					<td>{{serie.name}}</td>
					<td>{{serie.distance}}</td>
					<td>{{serie.city.name}}</td>
					<td>
						<button @click="deleteSerie(serie.id)">Supprimer</button>
						<router-link :to="{name: 'edit_serie', params: {id: serie.id}}"><button>Modifier</button></router-link>
						<router-link :to="{name: 'serie_photos', params: {id: serie.id}}"><button>Ajouter des photos</button></router-link>
						<router-link :to="{name: 'serie_rules', params: {id: serie.id}}"><button>Ajouter des règles</button></router-link>
					</td>

				</tr>
			</tbody>

		</table>
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
