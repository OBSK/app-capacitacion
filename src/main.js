import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import config  from './plugins/firebaseConfig'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

firebase.initializeApp(config);

const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
  console.log("ola q ase")
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    created() {
      store.dispatch('autoSignIn', firebaseUser)
      if(firebaseUser) {
        store.dispatch('loadCapacitadores')
        store.dispatch('loadAsist')
        store.dispatch('loadCapacitaciones')
        store.dispatch('loadAsistentesCapacitacion')
      }
    }
  })
  unsubscribe()
})


