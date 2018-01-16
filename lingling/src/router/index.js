import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/main'
import home from '@/components/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main
    },
    {
    	path: '/home',
    	name: 'home',
    	component: home
    }
  ]
})
