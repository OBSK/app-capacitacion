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
        const ciudad = payload.ciudad
        commit('setLoading', true)
        firebase.database().ref('asistentes/').push({
            dni: dni,
            datos: datos,
            registro: firebase.database.ServerValue.TIMESTAMP,
            profesion: profesion,
            ciudad: ciudad,
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
    loadAsist({commit}) {
        var ref = firebase.database().ref('asistentes/')
        ref.on('value', snap => {
            const asistente = snap.val()
            const asistentesArray = []
            for(let key in asistente) {
                asistentesArray.push({
                    id: key,
                    dni: asistente[key].dni,
                    datos: asistente[key].datos,
                    profesion: asistente[key].profesion,
                    registro: asistente[key].registro,
                    estado: asistente[key].estado,
                    ciudad: asistente[key].ciudad
                })
                commit('setAsist', asistentesArray)
            }
        })
    },
    deleteAsist({commit} ,payload) {
        firebase.database().ref('asistentes/'+ payload).remove()
    },
    updateAsist({commit}, payload) {
        if(payload.dni == "" || payload.datos == "") {
            commit('setError', {
                error: true,
                data: "Campos vacíos. Por favor complete los campos"
            })
        } else {
            commit('setLoading', true)
            firebase.database().ref('asistentes/' + payload.id).update({
                dni: payload.dni,
                datos: payload.datos,
                profesion: payload.profesion,
                registro: firebase.database.ServerValue.TIMESTAMP,
                ciudad: payload.ciudad
            }).then(snap => {
                commit('setLoading', false)
            }).catch(e => commit('setLoading', false))
            
        }
        
    }
}
const getters = {
    getAsist(state) {
        return state.asistentes
    }
}

export default { state, mutations, actions, getters }