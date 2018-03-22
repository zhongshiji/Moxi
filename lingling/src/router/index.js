import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import search from '@/components/search'
import other from '@/components/other'
import about from '@/components/about'
import homeselect from '@/components/home/homeselect'
import lingling from '@/components/lingling'
import changeinfo from '@/components/lingling/changeinfo'
import usermain from '@/components/lingling/usermain'
import blogview from '@/components/lingling/blogview'
import blogedit from '@/components/lingling/blogedit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/home/:type',
      name: 'homeselect',
      component: homeselect
    },
    {
      path: '/search/:search',
      name: 'search',
      component: search
    },
    {
      path: '/markdownUsage',
      name: 'other',
      component: other
    },
    {
      path: '/about',
      name: 'about',
      component: about
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
      path: '/lingling/posts/:postId',
      name: 'blogview',
      component: blogview,
    },
    {
      path: '/lingling/blogedit',
      name: 'blogedit',
      component: blogedit
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
