<template>
	<v-container grid-list-md text-xs-center fluid>
		<router-link to="/series/all"><v-btn color="primary">Retour</v-btn></router-link>
		<h1 class="text-xs-center">Serie rules</h1>
			<form @submit.prevent="saveRules()">
				<v-layout row wrap>
				<v-flex xs12 sm12 md6>
					<v-card color="grey lighten-4" flat>
						<h2>Paramétrage des distances (distance de calcul: 100m)</h2>
						<v-card-text>
							<v-container fluid>
								<v-layout row v-for="(palier, index) in current_serie.paliers" :key="palier.id">
									<v-flex xs4 offset-xs1>
										Coef: <v-text-field type="number" v-model="current_serie.paliers[index].coef"></v-text-field>
									</v-flex>
									<v-flex xs4 offset-xs1>
										Points: <v-text-field type="number" v-model="current_serie.paliers[index].points"></v-text-field>
									</v-flex>
									<v-flex xs1 offset-xs1>
										<v-icon color="error" v-if="current_serie.paliers.length > 1" fill-height @click="removePalier(index)">delete_forever</v-icon>
									</v-flex>
								</v-layout>
								<v-btn color="primary" type="button" @click="addPalier()">Add</v-btn>
							</v-container>
						</v-card-text>
					</v-card>
				</v-flex>
				<v-flex xs12 sm12 md6>
					<v-card xs5 offset-xs2 color="grey lighten-4" flat>
						<h2>Paramétrage du temps (unité: seconde)</h2>
						<v-card-text>
							<v-container fluid>
								<v-layout row v-for="(time, index) in current_serie.times" :key="time.id">
									<v-flex xs4 offset-xs1>
										Nombre de secondes: <v-text-field type="number" v-model="current_serie.times[index].nb_seconds"></v-text-field>
									</v-flex>
									<v-flex xs4 offset-xs1>
										Multiplicateur: <v-text-field type="number" v-model="current_serie.times[index].coef"></v-text-field>
									</v-flex>
									<v-flex xs4 offset-xs1>
										<v-icon color="error" v-if="current_serie.times.length > 1" type="button" @click="removeTime(index)">delete_forever</v-icon>
									</v-flex>
								</v-layout>
								<v-btn color="primary" type="button" @click="addTime()">Add</v-btn>
							</v-container>
						</v-card-text>
					</v-card>
				</v-flex>
					<v-btn color="primary" type="submit" value="save">Save</v-btn>
				</v-layout>
			</form>
	</v-container>
</template>

<script>

	import { mapGetters } from 'vuex'

	export default {
		data() {
			return {
			}
		},
		methods: {
			saveRules() {
				if(this.current_serie.paliers.length >= 1 && this.current_serie.times.length >= 1){
					//Submitting
					this.$store.dispatch('series/saveRules', this.current_serie).then((res) => {
						this.$router.push({name: 'series_list'})
					}).catch((e) => {
						console.log(e)
					})
				}else{
					alert('Au moins une règle par type')
				}
			},
			addPalier() {
				this.current_serie.paliers.push({
					coef: "",
					points: ""
				})
			},
			addTime() {
				this.current_serie.times.push({
					nb_seconds: "",
					coef: ""
				})
			},
			removePalier(palier_index) {
				this.current_serie.paliers.splice(palier_index, 1)
			},
			removeTime(times) {
				this.current_serie.times.splice(times, 1)
			},

		},

		computed: {
			...mapGetters({current_serie: 'series/getCurrentSerie'})
		}
	}

</script>

<style scoped>
	form{
		width: 100%;
	}
</style>
