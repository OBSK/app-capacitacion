import Vue from 'vue'
import Vuex from 'vuex'
import errorData from './store/error/errorData'
import registerFirebaseUser from './store/modules/registerFirebaseUser'
import loginFirebaseUser from './store/modules/loginFirebaseUser'
import registerCap from './store/modules/registerCap'
import registerAsist from './store/modules/registerAsist'
import loading from './store/modules/loding'
import capacitacionList from './store/modules/capacitacionList'
import instituciones from './store/modules/instituciones'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    loading,
    errorData,
    registerFirebaseUser,
    loginFirebaseUser,
    capacitacionList,
    registerCap,
    registerAsist,
    instituciones
  }
})
