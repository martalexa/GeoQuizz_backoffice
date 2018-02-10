import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
//Series routes
import Series from '@/components/Series'
import AddSerie from '@/components/AddSerie'
import SeriesList from '@/components/SeriesList'
//Series/{id} routes
import Serie from '@/components/Serie'
import EditSerie from '@/components/EditSerie'
import SerieRules from '@/components/SerieRules'
import SeriePhotos from '@/components/SeriePhotos'

import store from '@/store'

Vue.use(Router)

const router = new Router({
  routes: [
      {
          path: '*',
          component: SeriesList
      },
    {
      path: '/',
      name: 'signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
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
        },
        //Serie routes
        {
          path: ':id',
          component: Serie,
          name: 'serie',
          children: [
            {
              path: 'edit',
              component: EditSerie,
              name: 'edit_serie'
            },
            {
              path: 'rules',
              component: SerieRules,
              name: 'serie_rules'
            },
            {
              path: 'photos',
              component: SeriePhotos,
              name: 'serie_photos'
            }
          ]
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