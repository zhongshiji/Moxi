import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import usermain from '@/components/usermain'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
    	path: '/usermain',
    	name: 'usermain',
    	component: usermain
    }
  ]
})
