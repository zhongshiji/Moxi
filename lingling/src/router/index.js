import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import lingling from '@/components/lingling'
import changeinfo from '@/components/lingling/changeinfo'
import usermain from '@/components/lingling/usermain'

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
    },
    {
      path: '/lingling/usermain',
      name: 'usermain',
      component: usermain
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
