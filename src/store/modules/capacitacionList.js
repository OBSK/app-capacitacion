import firebase from 'firebase/app'
import 'firebase/database'
import moment from 'moment'
const state = {
    capacitadoresDatabase: [],
    capacitacionesDatabase: [],
    asistentesCapacitacion: []
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
    },
    setAsistentesCapacitacion(state, payload) {
        state.asistentesCapacitacion = payload
    },
    setAsistentesCapacitacionPush(state, payload) {
        state.asistentesCapacitacion.push(payload)
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
                    registro: capacitacion[key].registro,
                    estado: capacitacion[key].ciudad
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
                    id: key,
                    datos: Object.values(capacitador[key])
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
    },
    loadAsistentesCapacitacion({commit}, payload) {
        firebase.database().ref('asistentescapacitacion/').on('value', snapshot => {
            const asistente = snapshot.val()
            const asistentes = []
            for(let key in asistente) {
                const transformed = Object.entries(asistente[key]).map(([key, obj])=> {
                    return Object.assign(obj, {idCap: key})
                }) 
                asistentes.push({
                    id: key,
                    datos: transformed
                })
                commit('setAsistentesCapacitacion', asistentes)
            }
        })
    },
    registrarAsistentesCapacitacion({commit}, payload) {
        firebase.database().ref('asistentescapacitacion/' + payload.id).push({
            id: payload.asistente.id,
            dni: payload.asistente.dni,
            datos: payload.asistente.datos,
            registro: firebase.database.ServerValue.TIMESTAMP,
            profesion: payload.asistente.profesion,
            ciudad: payload.asistente.ciudad,
            horascapacitadas: 0,
            estado: false
        })
    },
    addAsistentesCapacitacion({commit}, payload) {
        const data = Object.assign({save: false}, payload)
        commit('setAsistentesCapacitacionPush', data)
    },
    registrarHorasCapacitadas({commit}, payload) {
        firebase.database().ref('asistentescapacitacion/' + payload.idcapacitacion + "/" + payload.data.id + "/").update({
            ciudad: payload.data.ciudad,
            horascapacitadas: payload.totalhoras,
            datos: payload.data.datos,
            dni: payload.data.dni,
            estado: payload.data.estado,
            id: payload.data.id,
            profesion: payload.data.profesion,
            registro: payload.data.registro
        }).then(res => {console.log("Actualizado con exito")})
    },
    deleteAsistente({commit}, payload) {
        firebase.database().ref('asistentescapacitacion/' + payload.idcapacitacion + "/" + payload.data.idCap).remove().then(res => console.log('Eliminado'))
    }
}
const getters = {
    getCapacitacion(state) {
        return state.capacitacionesDatabase
    },
    getCapacitadores(state) {
        return state.capacitadoresDatabase
    },
    getAsistentesCapacitacion(state) {
        return state.asistentesCapacitacion
    }
}

export default { state, mutations, actions, getters }