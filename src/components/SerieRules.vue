<template>
	<div>
		<p>Series Rules</p>
		<form @submit.prevent="saveRules()">
			<h2>Paramétrage des distances (distance de calcul: 100m)</h2>

			<div class="rule-raw" v-for="(palier, index) in current_serie.paliers">
				Coef: <input type="number" v-model="current_serie.paliers[index].coef">
				Points: <input type="number" v-model="current_serie.paliers[index].points">
				<button v-if="current_serie.paliers.length > 1" type="button" @click="removePalier(index)">X</button>
			</div>
			<button type="button" @click="addPalier()">Ajouter</button>
			<h2>Paramétrage du temps (unité: seconde)</h2>
			<div class="rule-raw" v-for="(time, index) in current_serie.times">
				Nombre de secondes: <input type="number" v-model="current_serie.times[index].nb_seconds">
				Multiplicateur: <input type="number" v-model="current_serie.times[index].coef">
				<button v-if="current_serie.times.length > 1" type="button" @click="removeTime(index)">X</button>
			</div>
			<button type="button" @click="addTime()">Ajouter</button>
			<input type="submit" value="Save">
		</form>
	</div>
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
					console.log(this.current_serie)
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
	
</style>