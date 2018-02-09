import api from '@/services/api'
import ls from '@/services/ls'

const initialState = {
    connected: false,
    user: {}
}

export default {
    namespaced: true, //permet d'y accéder de façon nommée
    state: {
        connected: false,
        user: {}
    },
    getters: {
        isConnected(state)  {
            return state.connected
        },
        getConnectedUser(state) {
            return state.user
        }
    },
    mutations: {
        setConnectedUser(state, u) {
            state.user = u
            state.connected = true
        },
        initState(state) {
            Object.assign(state, initialState)
        }
    },
    actions: {
        login({ commit }, credentials) {
            return api.post('/signin', [], {
                headers: {
                    'Authorization': 'Basic ' + window.btoa(credentials.username + ':' + credentials.password)
                }
            }).then(response => {
                console.log('Hello')
                ls.set('token', response.data.token)
                commit("setConnectedUser", {
                    usename: credentials.username,
                    token: response.data.token
                })
            }).catch(error => {
                return Promise.reject(error)
            })
        },
        signup({ commit }, user) {
            return api.post('/signup', user).then((response) => {

            }).catch((err) => {
                return Promise.reject(err)
            })
        },
        logout({ commit }) {
            commit("initState")
            ls.remove('token')
        }
    }
}