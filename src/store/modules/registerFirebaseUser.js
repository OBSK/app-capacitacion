import firebase from 'firebase/app'
import 'firebase/auth'
const state = {}
const actions = {
    async registrarUsuario({commit}, payload) {
        const user = "jarturo_huima@hotmail.com"
        const password = "12345678"
        await firebase.auth().createUserWithEmailAndPassword(user, password).then(res => {
            console.log(res)
        }).catch(e => {
            commit('setError', {
                error: true,
                data: e.message
            })
        })
    }
}
const mutations = {}
const getters = {}

export default { state, actions, mutations, getters }