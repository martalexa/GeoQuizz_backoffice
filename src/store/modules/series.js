import private_api from '@/services/private'
import ls from '@/services/ls'

const initialState = {
    series: [],
    current_serie: null,
    cities: []
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
		},
		setCurrentSerie(state, s) {
			state.current_serie = s
		},
		addNewPhoto(state, n) {
            state.current_serie.photos.push(n)
        },
        patchSerie(state, s) {
            // for(let i in state.series){
            // 	if(state.series[i].id == s.id){
            // 		state.series[i] = s
            // 		state.series = state.series.splice()
            // 		break
            // 	}
            // }
            // console.log('salut')
            // console.log(s)
        }
	},
	actions: {
		getSeries({commit}){
			return private_api.get('/series/').then((res) => {
				commit('setSeries', res.data)
				return Promise.resolve(res)
			}).catch((e) => {
				return Promise.reject(e)
			})
		},
		deleteSerie({commit,state}, serie_id){
			 return private_api.delete('/series/'+serie_id).then((res) => {
				commit('removeSerie', serie_id)

			}).catch((e) => {
				return Promise.reject(e)
			})
		},
		getCities({commit}){
			return private_api.get('/cities').then((res) => {
				commit('setCities', res.data)
			}).catch((err) => {
				return Promise.reject(err)
			})
		},
		saveSerie({commit}, serie) {
			return private_api.post('/series',serie).then((res) => {
				commit('addSerie', res.data)
			}).catch((e) => {
				return Promise.reject(e)
			})
		},
		getSerie({commit}, serie_id) {
			return private_api.get('/series/'+serie_id).then((res) => {
				commit('setCurrentSerie', res.data)
				return Promise.resolve(res)
			}).catch((e) => {
				return Promise.reject(e)
			})
		},
		saveRules({commit, state}, serie){
			return private_api.put('/series/'+state.current_serie.id+'/rules', serie).then((res) => {
				commit('setCurrentSerie', res.data)
				return Promise.resolve(res)
			}).catch((e) => {
				return Promise.reject(e)
			})
		},
        patchSerie({ commit, state }, serie) {
          return  private_api.patch('series/' + state.current_serie.id + '/edit', serie).then((res) => {
                commit('patchSerie', res.data)
                return Promise.resolve(res)
            }).catch((e) => {
                return Promise.reject(e)
            })
        },
        addPhoto({ commit, state }, newphoto) {
           return private_api.post('/series/' + state.current_serie.id + '/photos', newphoto).then((res) => {
                console.log(state.current_serie.id)
                commit('addNewPhoto', res.data)
                return Promise.resolve(res)
            }).catch((e) => {
                return Promise.reject(e)
            })
        }
	}
}
