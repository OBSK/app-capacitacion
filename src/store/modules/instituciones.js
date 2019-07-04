const state = {
    instituciones: ['Universidad César Vallejo', 'Universidad Nacional', 'UCP', 'UNI', 'UPEU', 'Otros'],
    ciudadList: ['Tarapoto', 'Moyobamba', 'Juanjui', 'Bellavista', 'Chiclayo', 'Lima', 'Otros']
}
const getters = {
    getInstituciones(state) {
        return state.instituciones
    },
    getCiudadList(state) {
        return state.ciudadList
    }
}
export default {state, getters}