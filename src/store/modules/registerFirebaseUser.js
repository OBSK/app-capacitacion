import firebase from 'firebase/app'

const state = {
    userDatabase: []
}
const mutations = {
    setUsuariosDatabase(state, payload) {
        state.userDatabase = payload
    }
}
const actions = {
    async registrarUsuario({commit}, payload) {
        const user = payload.email
        const password = payload.contrasena
        // Registrar usuario por medio del administrador 
        // admin.auth().createUser({
        //     email: user,
        //     password: password
        // }).then(res => console.log(res)).catch(err => console.log(err, ">>error"))
        await firebase.auth().createUserWithEmailAndPassword(user, password).then(res => {
            firebase.database().ref('usuarios/').push({
                usuario: payload.usuario,
                email: payload.email,
                contrasena: payload.contrasena,
                telefono: payload.telefono,
                ciudad: payload.ciudad,
                registro: firebase.database.ServerValue.TIMESTAMP
            })
        }).catch(e => {
            commit('setError', {
                error: true,
                data: e.message
            })
        })
    },
    async loadUsuarios({commit}, payload) {
        await firebase.database().ref('usuarios/').on('value', snap => {
            const user = snap.val()
            const users = []
            for(let key in user) {
                users.push({
                    id: key,
                    usuario: user[key].usuario,
                    email: user[key].email,
                    contrasena: user[key].contrasena,
                    telefono: user[key].telefono,
                    ciudad: user[key].ciudad,
                    registro: user[key].registro
                })
                commit('setUsuariosDatabase', users)
            }
        })
    }
}
const getters = {
    getUsuariosDatabase(state) {
        return state.userDatabase
    }
}

export default { state, actions, mutations, getters }