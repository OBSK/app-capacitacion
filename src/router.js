import Vue from 'vue'
import firebase from 'firebase/app'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Index from './views/Index.vue'
import RegistrarAsist from './views/RegistrarAsist.vue'
import RegistrarCap from './views/RegistrarCap.vue'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'Home',
      component: Index
    },
    {
      path: '/registrarasistente',
      name: 'RegistrarAsist',
      component: RegistrarAsist
    },
    {
      path: '/registrarcapacitacion',
      name: 'RegistrarCapacitacion',
      component: RegistrarCap
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () { 
        return import(/* webpackChunkName: "about" */ './views/About.vue')
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !currentUser) next('Index')
  else if (!requiresAuth && currentUser) next('Index')
  else next()
})

export default router
