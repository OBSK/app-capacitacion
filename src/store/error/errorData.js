const state = {
    errorObject: {
        error: false,
        data: ''
    }
}
const mutations = {
    setError(state, payload) {
        state.errorObject = payload
    }
}
const actions = {
    clearError({commit}) {
        commit('setError', {
            error: false,
            data: ''
        })       
    }
}
const getters = {
    getError(state) {
        return state.errorObject
    }
}

export default { state, mutations, actions, getters }