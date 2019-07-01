import firebase from 'firebase/app'
import 'firebase/database'
const state = {
    asistentes: []
}
const mutations = {
    setAsist(state, payload) {
        state.asistentes = payload
    }
}
const actions = {
    registerAsist({commit},payload) {
        const dni = payload.dni
        const datos = payload.datos
        const profesion = payload.profesion
        commit('setLoading', true)
        firebase.database().ref('asistentes/').push({
            dni: dni,
            datos: datos,
            registro: firebase.database.ServerValue.TIMESTAMP,
            profesion: profesion,
            estado: false
        }).then(res => { 
            commit('setLoading', false)
            console.log(res, ">>response")
        }).catch(e => {
            commit('setLoading', false)
            commit('setError', {
                error: true,
                data: e.message
            })
        })
    },
    loadAsist({commit}, payload) {
        var ref = firebase.database().ref('asistentes/')
        ref.on('value', snap => {

        })
    }
}
const getters = {
    getAsist(state) {
        return state.asistentes
    }
}

export default { state, mutations, actions, getters }