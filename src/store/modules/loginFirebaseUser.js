import firebase from 'firebase/app'
import 'firebase/auth'
import router from '@/router'
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
            commit('setUser', res)
            router.push('/')
        }).catch(e => {
            commit('setError', {
                error: true,
                data: e.message
            })
        })
    },
    autoSignIn({commit}, payload) {
        commit('setUser', payload)
    },
    userSignOut({commit}) {
        firebase.auth().signOut()
        commit('setUser', null)
        router.push('/login')
    }
}
const getters = {
    getUser (state) {
        return state.user
    }
}
export default { state, mutations, actions, getters }