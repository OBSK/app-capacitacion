const state = {
    instituciones: ['Universidad César Vallejo', 'Universidad Nacional', 'UCP', 'UNI', 'UPEU', 'Otros'],
    ciudadList: ['Tarapoto', 'Moyobamba', 'Juanjui', 'Bellavista', 'Chiclayo', 'Lima', 'Otros'],
    profesionesList: ['Ingeniería de Sistemas', 'Ingeniería', 'Derecho', 'Economía', 'Ingeniería Civil', 'Agronomía', 'Otros']
}
const getters = {
    getInstituciones(state) {
        return state.instituciones
    },
    getCiudadList(state) {
        return state.ciudadList
    },
    getProfesionesList(state) {
        return state.profesionesList
    }
}
export default { state, getters }