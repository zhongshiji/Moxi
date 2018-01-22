import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import lingling from '@/components/lingling'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
    	path: '/lingling',
    	name: 'lingling',
    	component: lingling
    }
  ]
})
