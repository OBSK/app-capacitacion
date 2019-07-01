import firebase from 'firebase/app'
import 'firebase/auth'
const state = {}
const mutations = {}
const actions = {
    async loginFirebaseUser({commit}, payload) {
        const email = payload.user
        const password = payload.password
        await firebase.auth().signInWithEmailAndPassword(email, password).then(res => {
            console.log("Inicio de sesion exitoso")
        }).catch(e => {
            commit('setError', {
                error: true,
                data: e.message
            })
        })
    }
}
const getters = {}
export default {state, mutations, actions, getters}