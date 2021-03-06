import firebase from 'firebase/app'
import 'firebase/database'
import moment from 'moment'
const state = {
    capacitadoresDatabase: [],
    capacitacionesDatabase: [],
    asistentesCapacitacion: [],
    replica: []
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
    },
    setReplica(state, payload) {
        state.replica = payload
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
                    fechatermino: capacitacion[key].fechatermino,
                    horas: capacitacion[key].horas,
                    institucion: capacitacion[key].institucion,
                    nombre: capacitacion[key].nombre,
                    registro: capacitacion[key].registro,
                    estado: capacitacion[key].ciudad,
                    establecimiento: capacitacion[key].establecimiento,
                    ubigeo: capacitacion[key].ubigeo,
                    direccion: capacitacion[key].direccion,
                    numeroregistro: capacitacion[key].numeroregistro
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
    loadReplica({commit}, payload) {
        firebase.database().ref('asistentesreplica/').on('value', snap => {
            const replica = snap.val()
            const replicas = []
            for(let key in replica) {
                const transformed = Object.entries(replica[key]).map(([key, obj])=> {
                    return Object.assign(obj, {idCap: key})
                }) 
                replicas.push({
                    id: key,
                    datos: transformed
            })
            commit('setReplica', replicas)
            }
        })
    },
    registrarAsistentesCapacitacion({commit}, payload) {
        firebase.database().ref('asistentescapacitacion/' + payload.id.id + "/" + payload.asistente.id).update({
            idasistente: payload.asistente.id,
            dni: payload.asistente.dni,
            datos: payload.asistente.datos,
            registro: firebase.database.ServerValue.TIMESTAMP,
            profesion: payload.asistente.profesion,
            ciudad: payload.asistente.ciudad,
            replica: 'No',
            horascapacitadas: 0,
            estado: false,
            nombrecapacitacion: payload.id.nombre,
            idcapacitacion: payload.id.id,
            microred: payload.id.ciudad,
            establecimiento: payload.id.establecimiento,
            fecha: payload.id.fecha,
            fechatermino: payload.id.fechatermino
            // nombrecapacitacion: payload.capacitacion.nombre,
            // lugar: payload.capacitacion.direccion,
            // fecha: payload.capacitacion.fecha,
            // institucion: payload.capacitacion.institucion,
            // horas: payload.capacitacion.horas,
            // ubigeo: payload.capacitacion.ubigeo,
            // establecimiento: payload.capacitacion.establecimiento
        })
    },
    addAsistentesCapacitacion({commit}, payload) {
        const data = Object.assign({save: false}, payload)
        commit('setAsistentesCapacitacionPush', data)
    },
    updateReplica({commit}, payload) {
        firebase.database().ref('asistentesreplica/' + payload.capacitacion.id + "/" + payload.replica.idasistente).set({
            idAsist: payload.replica.idCap,
            fecha: payload.fecha,
            registro: firebase.database.ServerValue.TIMESTAMP,
            establecimiento: payload.establecimiento

        }).then(res => console.log('Replica Registrada'))
    },
    registrarHorasCapacitadas({commit}, payload) {
        console.log(payload.idcapacitacion, payload.data.idasistente)
        const horastotales = Number(payload.data.horascapacitadas) + Number(payload.totalhoras)
        firebase.database().ref('asistentescapacitacion/' + payload.idcapacitacion + "/" + payload.data.idasistente + "/").update({
            ciudad: payload.data.ciudad,
            idcapacitacion: payload.idcapacitacion,
            horascapacitadas: horastotales,
            datos: payload.data.datos,
            dni: payload.data.dni,
            estado: payload.data.estado,
            idasistente: payload.data.idasistente,
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
    },
    getReplica (state) {
        return state.replica
    }
}

export default { state, mutations, actions, getters }