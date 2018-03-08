import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import lingling from '@/components/lingling'
import changeinfo from '@/components/lingling/changeinfo'

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
    },
    {
      path: '/lingling/changeinfo',
      name: 'changeinfo',
      component: changeinfo
    }
  ]
})
