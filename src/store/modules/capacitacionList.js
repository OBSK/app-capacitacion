import firebase from 'firebase/app'
import 'firebase/database'
import moment from 'moment'
const state = {
    capacitadoresDatabase: [],
    capacitacionesDatabase: []
}
const mutations = {
    setCapacitacionesDatabase(state , payload) {
        state.capacitacionesDatabase = payload
    },
    setDeleteCapacitacion(state, payload) {
        const record = state.capacitacionesDatabase.find(data => {data.id == payload})
        state.capacitacionesDatabase.splice(state.capacitacionesDatabase.indexOf(record,1))
    },
    setCapacitadoresDatabase(state , payload) {
        state.capacitadoresDatabase = payload
    }
}
const actions = {
    loadCapacitaciones ({commit}) {
        firebase.database().ref('capacitacion/').on('value', snapshot => {
            const capacitacion = snapshot.val()
            const capacitaciones = []
            for(let key in capacitacion) {
                capacitaciones.push({
                    id: key,
                    ciudad: capacitacion[key].ciudad,
                    creditos: capacitacion[key].creditos,
                    fecha: capacitacion[key].fecha,
                    horas: capacitacion[key].horas,
                    institucion: capacitacion[key].institucion,
                    nombre: capacitacion[key].nombre,
                    registro: capacitacion[key].registro
                })
                commit('setCapacitacionesDatabase', capacitaciones)
            }
        })
    },
    loadCapacitadores ({commit}) {
        firebase.database().ref('capacitadores/').on('value', snapshot => {
            const capacitador = snapshot.val()
            const capacitadores = []
            for(let key in capacitador) {
                capacitadores.push({
                    ciudad: capacitador[key].ciudad,
                    creditos: capacitador[key].creditos,
                    fecha: capacitador[key].fecha,
                    horas: capacitador[key].horas,
                    institucion: capacitador[key].institucion,
                    nombre: capacitador[key].nombre,
                    registro: capacitador[key].registro,
                })
                commit('setCapacitadoresDatabase', capacitadores)
            }
        })
    },
    deleteCapacitacion({commit}, payload) {
        firebase.database().ref('capacitacion/'+ payload).remove()
        commit('setDeleteCapacitacion', payload)
    },
    updateCapacitacion({commit}, payload) {
        firebase.database().ref('capacitacion/' + payload.id).update({
            ciudad: payload.ciudad,
            creditos: payload.creditos,
            fecha: moment(payload.fecha).format('DD-MM-YYYY'),
            horas: payload.horas,
            institucion: payload.institucion,
            nombre: payload.nombre,
            registroupdate: firebase.database.ServerValue.TIMESTAMP
        }).then(res => { alert('Actualizado correctamente') })
    }
}
const getters = {
    getCapacitacion(state) {
        return state.capacitacionesDatabase
    },
    getCapacitadores(state) {
        return state.capacitadoresDatabase
    }
}

export default { state, mutations, actions, getters }