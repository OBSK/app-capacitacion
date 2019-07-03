import Vue from 'vue'
import firebase from 'firebase/app'
import Router from 'vue-router'
// import Login from './views/Login.vue'
// import Index from './views/Index.vue'
// import RegistrarAsist from './views/RegistrarAsist.vue'
// import RegistrarCap from './views/RegistrarCap.vue'
import ErrorPage from './components/ErrorPage'

const routerOptions = [
  { path: '/login', component: 'Login'},
  { path: '/', component: 'Index', meta: { requiresAuth: true}},
  { path: '/registrarasistente', component: 'RegistrarAsist', meta: { requiresAuth: true}},
  { path: '/registrarcapacitacion', component: 'RegistrarCapacitacion', meta: { requiresAuth: true}}
]

Vue.use(Router)
const routes = routerOptions.map(route => {
  return {
    path: route.path,
    component: () => import(`./components/${route.component}.vue`),
    meta: route.meta
  }
})

const router = new Router({
  mode: 'history',
  routes: [
    ...routes,
    { path: '*', component: ErrorPage }
  ]
})
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const user = firebase.auth().currentUser
  if(requiresAuth && !user) {
    next('/login')
  }
  next()
})
export default router
