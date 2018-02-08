import private_api from '@/services/private'
import ls from '@/services/ls'

const initialState = {
	series: [],
	current_serie: null
}

export default {
	namespaced: true,//permet d'y accéder de façon nommée
	state: {
		series: [],
		current_serie: null,
		cities: []
	},
	getters: {
		getSeries (state) {
			return state.series
		},
		getCurrentSerie (state) {
			return state.current_serie
		},
		getCities (state) {
			return state.cities
		}
	},
	mutations: {
		setSeries (state, s) {
			state.series = s
		},
		setSerie(state, s) {
			for(let i in state.series){
				if(state.series[i].id == s.id){
					state.series[i] = s
					state.series = state.series.splice()
					break
				}
			}
		},
		removeSerie(state, serie_id){
			state.series = state.series.filter(element => element.id != serie_id)
		},
		setCities (state, c){
			state.cities = c
		},
		addSerie(state, s) {
			state.series.push(s)
		}
	},
	actions: {
		getSeries({commit}){
			private_api.get('/series').then((res) => {
				commit('setSeries', res.data)
				return Promise.resolve(res)
			}).catch((e) => {
				console.log(e)
			})
		},
		deleteSerie({commit}, serie_id){
			return private_api.delete('/series').then((res) => {
				commit('removeSerie', serie_id)
			}).catch((e) => {
				console.log(e)
			})
		},
		getCities({commit}){
			return private_api.get('/cities').then((res) => {
				commit('setCities', res.data)
			}).catch((res) => {
				console.log(e)
			})
		},
		saveSerie({commit}, serie) {
			private_api.post('/series',serie).then((res) => {
				commit('addSerie', res.data)
			}).catch((e) => {
				console.log(e)
			})
		}
	}
}