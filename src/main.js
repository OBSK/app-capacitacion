import Vue from 'vue'
import firebase from 'firebase/app'
import config from './plugins/firebaseConfig'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

firebase.initializeApp(config);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
