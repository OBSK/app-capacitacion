import firebase from 'firebase/app'
import 'firebase/auth'
const state = {
    user: ''
}
const mutations = {
    setUser(state, payload) {
        state.user = payload
    }
}
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
    },
    autoSignIn({commit}, payload) {
        commit('setUser', payload)
    }
}
const getters = {}
export default {state, mutations, actions, getters}