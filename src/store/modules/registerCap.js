import firebase from 'firebase/app'
import 'firebase/database'
const state = {
    capacitadores: [],
    capacitadoresArray: []
}
const mutations = {
    setCapacitador(state, payload) {
        state.capacitadores = payload
    },
    setAddCapacitador(state, payload) {
        const record = state.capacitadoresArray.find(e => e.id == payload.id)
        if(record) {
            console.log("El asistente ya fue agregado")
        } else {
            state.capacitadoresArray.push(payload)
        }       
    },
    setDeleteCapacitador(state, payload) {
        const record = state.capacitadoresArray.find(data => { data.id == payload })
        state.capacitadoresArray.splice(state.capacitadoresArray.indexOf(record), 1)
    }
}
const actions = {
    registerCapacitacion({commit}, payload) {
        const ref = firebase.database().ref('capacitacion/')
        ref.push({
            
        })
    },
    addCapacitador({commit}, payload) {
        commit('setAddCapacitador', payload)
    },
    deleteCapacitador({commit}, payload) {
        commit('setDeleteCapacitador', payload)
    }
}
const getters = {
    getCapacitador (state) {
        return state.capacitadoresArray
    }
}

export default { state, mutations, actions, getters }