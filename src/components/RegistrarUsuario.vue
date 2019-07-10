<template>
    <v-container fluid gird-list-md>
        <v-layout wrap>
            <v-flex xs12 sm12 md6>
                <v-card flat>
                    <v-card-title class="headline">Registrar nuevo usuario</v-card-title>
                    <form @submit.prevent="registrarUsuario">
                        <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12 sm6 md6>
                                        <v-text-field label="Nombre del Usuario" type="text" required v-model="usuario"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                            <v-select
                                            label="Ciudad"
                                            :items="ciudadList"
                                            v-model="ciudad"
                                            >
                                            </v-select>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-text-field label="Correo electrónico" type="email" required v-model="email"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-text-field label="Teléfono" type="number" required v-model="telefono"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-text-field label="Contraseña" id="contrasena" type="password" required v-model="contrasena"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-text-field label="Repita la contraseña" type="password" id="repeatContrasena" required :rules="[comparePasswords]" v-model="repeatContrasena"></v-text-field>
                                    </v-flex>
                                    <small style="color: green;">* Por favor verifique que los datos sean correctos. Recuerde su correo electrónico y contraseña.</small>
                                </v-layout>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-3" dark type="submit">Registrar</v-btn>
                        </v-card-actions>
                    </form>
                </v-card>
            </v-flex>
            <v-flex xs12 sm12 md6>
                <v-card class="elevation-3">
                    <v-card-title class="headline">Lista de usuarios</v-card-title>
                    <v-card-text>
                        <v-data-table
                        :headers="headers"
                        :items="userList">
                        <template v-slot:items="props">
                            <td> {{ props.item.usuario }} </td>
                            <td> {{ props.item.email }} </td>
                            <td> {{ props.item.telefono }} </td>
                            <td> {{ props.item.ciudad }} </td>
                            <td> Registrado {{ moment(props.item.registro).locale('es').fromNow() }} </td>
                            <td align="center">
                                <v-icon small color="green" @click="changePassword" title="Cambiar contraseña">https</v-icon>
                                <v-icon small color="red" @click="deleteUser" title="Eliminar usuario">delete</v-icon>
                            </td>
                        </template>
                        <template v-slot:no-data>
                            <h4>No tenemos registros disponibles</h4>
                        </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import moment from 'moment'
export default {
    data: () => ({
        ciudad: 'Tarapoto',
        usuario: '',
        email: '',
        telefono: '',
        contrasena: '',
        moment: moment,
        repeatContrasena: '',
        headers: [
            {text: 'Usuario', value: 'usuario'},
            {text: 'Email', value: 'email'},
            {text: 'Telefono', value: 'telefono'},
            {text: 'Ciudad', value: 'ciudad'},
            {text: 'Registro', value: 'registro'},
            {text: 'Opciones'}
        ]
    }),
    computed: {
        ciudadList () {
            return this.$store.getters.getCiudadList
        },
        comparePasswords () {
            return this.contrasena !== this.repeatContrasena ? 'Las contraseñas no coinciden' : ''
        },
        userList () {
            return this.$store.getters.getUsuariosDatabase
        }
    },
    methods: {
        registrarUsuario () {
            if(this.contrasena === this.repeatContrasena) {
                this.$store.dispatch('registrarUsuario', {
                    usuario: this.usuario,
                    email: this.email,
                    contrasena: this.contrasena,
                    ciudad: this.ciudad,
                    telefono: this.telefono
                })
            } 
        },
        changePassword () {
            alert('En construcción')
        },
        deleteUser () {
            alert('También en construcción')
        }
    },
 }
</script>
