import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/components/Signin'
import Series from '@/components/Series'
import AddSerie from '@/components/AddSerie'
import SeriesList from '@/components/SeriesList'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'signin',
      component: Signin
    },
    { 
      path: '/series', component: Series, name: 'series',
      children: [
        {
          path: 'add',
          component: AddSerie,
          name: 'add_serie'
        },
        {
          path: 'all',
          component: SeriesList,
          name: 'series_list'
        }
      ]
    }
  ]
})

export default router


router.beforeEach((to, from, next) => {
	if(to.name != 'signin' && to.name != 'signup' && ! store.getters['auth/isConnected']) {
    	next({name: 'signin', query: {redirect: to.fullPath}})
  	}
	  else if ((to.name == 'signin' || to.name == 'signup') && store.getters['auth/isConnected']) {
	  	next({name: 'series'})
	  }
	  else {
	    next()
	  }
})