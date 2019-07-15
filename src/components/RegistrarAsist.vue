<template>
    <v-container fluid grid-list-md> 
        <v-layout wrap>
            <v-flex xs12 sm6 md6>
                <v-card flat>
                    <v-card-title class="headline">
                        <v-icon>contacts</v-icon>
                        Registrar nuevo asistente
                    </v-card-title>
                        <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                     <v-flex xs12 sm6 md5>
                                         <v-text-field label="DNI" type="number" hint="8 caracteres" v-model="dni" max-length="8" min-length="8"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md7>
                                        <v-text-field label="Nombres y apellidos" type="text" v-model="datos" :disabled="loading"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-list>
                                            <v-select
                                            v-model="profesion"
                                            :items="profesionesList"
                                            hint="Profesion"
                                            persistent-hint>
                                            </v-select>
                                        </v-list>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-list>
                                            <v-select
                                            v-model="ciudad"
                                            :items="ciudadList"
                                            hint="Ciudad"
                                            persistent-hint>
                                            </v-select>
                                        </v-list>
                                    </v-flex>
                                    <v-flex xs12 sm12 md6>
                                            <v-select
                                            v-model="condicion"
                                            menu-props="auto"
                                            :items="condicionList"
                                            label="Condicion">
                                            </v-select>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-select
                                        label="Establecimiento"
                                        menu-props="auto"
                                        v-model="establecimiento.descripcion"
                                        :items="establecimientoList"
                                        item-text="descripcion">
                                        </v-select>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="registrarAsist" dark color="green darken-2" :loading="loading">
                                <v-icon>assignment_ind</v-icon>
                                Registrar asistente
                            </v-btn>
                        </v-card-actions>
                </v-card>
            </v-flex>
            <v-flex xs12 sm6 md6>
                <v-card flat>
                    <v-card-title class="headline"> Lista de asistentes
                        <v-spacer></v-spacer>
                    <v-text-field append-icon="search" label="Buscar" single-line hide-details v-model="search"></v-text-field>
                    </v-card-title>
                    <v-data-table
                    :headers="headers"
                    :items="asistentes"
                    :search="search">
                    <template v-slot:items="props">
                        <td> {{ props.item.dni }} </td>
                        <td> {{ props.item.datos }} </td>
                        <td> {{ props.item.profesion }} </td>
                        <td> {{ props.item.ciudad }} </td>
                        <td v-if="props.item.establecimiento" align="center"> {{ props.item.establecimiento }} </td>
                        <td v-else align="center"> Sin registros </td>
                        <td title="Registrado por" style="color:green;"> {{ props.item.registropor }} </td>
                        <td title="Fecha de registro"> {{ moment(props.item.registro).format('DD/MM/YYYY') }} {{ moment(props.item.registro).locale('es').fromNow()}} </td>
                        <td> {{ props.item.condicion }} </td>
                        <td class="justify-center layout px-0">
                        <v-icon
                            small
                            title="Editar"
                            class="mr-2"
                            @click="dialogEdit = true, activeItem = props.item.id"
                        >
                            edit
                        </v-icon>
                        <v-icon
                            small
                            title="Eliminar"
                            @click="deleteItem(props.item.id)"
                        >
                            delete
                        </v-icon>
                        </td>
 
                    </template>
                    <template v-slot:no-data>
                        <v-alert :value="true" color="error" icon="warning">
                            No tenemos datos disponibles :/
                        </v-alert>
                    </template>
                    </v-data-table>
                    <!-- Dialog Edit -->
                    <v-dialog v-model="dialogEdit" max-width="600px">
                        <v-card>
                            <v-card-title class="headline">Editar asistente {{ findAsistentes.datos }} </v-card-title>
                            <v-card-text>
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12 sm6 md6>
                                            <v-text-field label="DNI" type="number" v-model="findAsistentes.dni"></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm6 md6>
                                            <v-text-field label="Nombres y apellidos" class="text-uppercase" type="text" v-model="findAsistentes.datos" ></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm6 md6>
                                            <v-list>
                                                <v-select
                                                v-model="profesion"
                                                menu-props="auto"
                                                :items="profesionesList"
                                                label="Profesion">
                                                </v-select>
                                            </v-list>
                                        </v-flex>
                                        <v-flex xs12 sm6 md6>
                                            <v-list>
                                                <v-select
                                                v-model="ciudad"
                                                menu-props="auto"
                                                :items="ciudadList"
                                                label="Profesion"
                                                >
                                                </v-select>
                                            </v-list>
                                        </v-flex>
                                        <v-flex xs12 sm12 md6>
                                            <v-select
                                            v-model="condicion"
                                            menu-props="auto"
                                            :items="condicionList"
                                            label="Condicion">
                                            </v-select>
                                        </v-flex>
                                        <v-flex xs12 sm6 md6>
                                            <v-select
                                            label="Establecimiento"
                                            menu-props="auto"
                                            v-model="establecimiento.descripcion"
                                            :items="establecimientoList"
                                            item-text="descripcion">
                                            </v-select>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn dark color="red" @click="dialogEdit = false" >Cancelar</v-btn>
                                <v-btn dark color="success" @click="updateAsist" >Actualizar</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-card>
            </v-flex>
        </v-layout>            
    </v-container>
</template>
<script>
import { watch } from 'fs';
import axios from 'axios';
import moment from 'moment';
export default {
    data: () => ({
        headers: [
            { text: 'DNI', value: 'dni' },
            { text: 'Nombres y apellidos', value: 'datos' },
            { text: 'Profesión', value: 'profesion' },
            { text: 'Ciudad', value: 'ciudad' },
            { text: 'Establecimiento', value: 'establecimiento' },
            { text: 'Registro', value: 'registropor' },
            { text: 'Fecha de registro', value: 'registro' },
            { text: 'Condicion', value: 'condicion'},
            { text: 'Estado', value: 'estado' }
        ],
        dialogEdit: false,
        activeItem: '',
        dni: '',
        datos: '',
        profesion: 'MEDICO GENERAL',
        ciudad: 'TARAPOTO',
        establecimiento: { descripcion: 'TARAPOTO', codDep: '22', codProv: '09', codDist: '01' },
        condicion: 'ALUMNO',
        moment: moment,
        search: ''
    }),
    computed: {
        asistentes () {
            return this.$store.getters.getAsist
        },
        loading () {
            return this.$store.getters.getLoading
        },
        findAsistentes () {
            return this.$store.getters.getAsist.find(data => {
                return data.id == this.activeItem
            }) || []
        },
        userActive () {
            return this.$store.getters.getUser.email
        },
        profesionesList() {
            return this.$store.getters.getProfesionesList
        },
        ciudadList () {
            return this.$store.getters.getMicroRed
        },
        condicionList () {
            return this.$store.getters.getCondicion
        },
        establecimientoList () {
            return this.$store.getters.getEstablecimiento
        }
    },
    methods: {
        registrarAsist() {
            if(this.dni == "" || this.datos == "") {
                alert("Campos vacíos. Por favor complete los campos")
            } else {
                this.$store.dispatch('registerAsist', {
                    dni: this.dni,
                    datos: this.datos,
                    profesion: this.profesion,
                    ciudad: this.ciudad,
                    registro: this.userActive,
                    condicion: this.condicion,
                    establecimiento: this.establecimiento
                })
                this.datos = ""
                this.dni = ""  
            }
        },
        deleteItem(id) {
            this.$store.dispatch('deleteAsist', id)
        },
        updateAsist() {
            this.dialogEdit = false
            this.$store.dispatch('updateAsist', this.findAsistentes)
        }
    },
    watch: {
        dni(value) {
            if(value.length == 8) {
                this.$store.dispatch('loading', true)
                axios.post('https://immense-wave-82825.herokuapp.com/api/v1/dni', {
                    dni: this.dni
                }, {
                    params: {
                        token: 'abcxyz'
                    }
                }).then(res => {
                    this.$store.dispatch('loading', false)
                    this.datos = res.data[0].nombres + " " + res.data[0].apellidoPaterno + " " + res.data[0].apellidoMaterno
                })
            }
        }
    }
}
</script>