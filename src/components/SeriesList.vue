<template>
	<div>
		<h1>Series List! <router-link to="/series/add">Add new</router-link></h1>
		<table>
			<tbody>
				<th>ID</th>
				<th>Distance</th>
				<th>City</th>
				<th>Actions</th>
				<tr v-for="serie in series">
					<td>{{serie.id}}</td>
					<td>{{serie.distance}}</td>
					<td>{{serie.city.name}}</td>
					<td>
						<button @click="deleteSerie(serie.id)">Supprimer</button>
						<button @click="">Modifier</button>
						<button @click="">Ajouter des photos</button>
						<button @click="">Ajouter des règles</button>
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

			}
		},
		computed: {
			...mapGetters({series: 'series/getSeries'})
		}
	}
</script>

<style scoped>
	
</style>