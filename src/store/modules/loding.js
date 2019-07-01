const state = {
    loading: false   
}
const mutations = {
    setLoading(state, payload) {
        state.loading = payload
    }
}
const actions = {
    loading({commit}, payload) {
        console.log('Cargando...')
        commit('setLoading', payload)
    }
}
const getters = {
    getLoading(state) {
        return state.loading
    }
}

export default { state, mutations, actions, getters }