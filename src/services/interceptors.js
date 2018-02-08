import Vue from 'vue'
import private_api from '@/services/private'
import ls from '@/services/ls'
import store from '@/store'

export default {
	install: (Vue, options = {}) => {
		// Add a request interceptor
		private_api.interceptors.request.use( function (config) {
			if(ls.get('token')){
				if(!config.params){
					config.params = {}
				}
				config.headers['Authorization'] = 'Bearer '+ls.get('token')
			}
			return config
		}, function (error) {
			return Promise.reject(error)
		})

		// Add a response interceptor
		private_api.interceptors.response.use(function (response) {
			return response;
		}, function (error) {
			if(error.response && error.response.status == 401){
				store.dispatch('auth/logout', ! error.response.data.error.indexOf("wrong token"))
				options.router.push({name: 'signin'})
			}
			return Promise.reject(error)
		})
	}
}
