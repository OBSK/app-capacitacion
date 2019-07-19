import firebase from 'firebase/app'
import 'firebase/database'
import router from '@/router'
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
        console.log(payload)
        const capacitadores = payload.capacitadores
        const ref = firebase.database().ref('capacitacion/')
        const ubigeo = payload.establecimiento.codDep + payload.establecimiento.codProv + payload.establecimiento.codDist
        ref.push({
            nombre: payload.nombre,
            institucion: payload.institucion,
            fecha: payload.fecha,
            fechatermino: payload.fechatermino,
            registro: firebase.database.ServerValue.TIMESTAMP,
            horas: payload.horas,
            creditos: payload.creditos,
            ciudad: payload.ciudad.text,
            estado: true,
            establecimiento: payload.establecimiento.descripcion,
            ubigeo: ubigeo,
            direccion: payload.direccion,
            numeroregistro: payload.numeroregistro
        }).then(res => {
            capacitadores.forEach(data => {
                firebase.database().ref('capacitadores/' + res.key).push({
                    datos: data.datos,
                    id: data.id,
                    avatar: 'https://www.tattoofun.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/s/q/squirtle_sm.jpg',
                    dni: data.dni
                })
            })
            router.push('/')        
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