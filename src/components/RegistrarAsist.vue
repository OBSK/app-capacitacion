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
                                        <v-text-field label="Nombres y apellidos" type="text" v-model="datos"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-list>
                                            <v-select
                                            v-model="profesion"
                                            :items="profesionesList">
                                            </v-select>
                                        </v-list>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-list>
                                            <v-select
                                            v-model="ciudad"
                                            :items="ciudadList">
                                            </v-select>
                                        </v-list>
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
                    <v-card-title class="headline"> Lista de asistentes</v-card-title>
                    <v-data-table
                    :headers="headers"
                    :items="asistentes">
                    <template v-slot:no-data>
                        <v-alert :value="true" color="error" icon="warning">
                            No tenemos datos disponibles :/
                        </v-alert>
                    </template>
                    </v-data-table>
                </v-card>
            </v-flex>
        </v-layout>            
    </v-container>
</template>
<script>
export default {
    data: () => ({
        profesionesList: ['Ingeniería de Sistemas', 'Ingeniería', 'Derecho', 'Economía', 'Ingeniería Civil', 'Agronomía', 'Otros'],
        ciudadList: ['Tarapoto', 'Moyobamba', 'Juanjui', 'Bellavista', 'Chiclayo', 'Lima', 'Otros'],
        headers: [
            { text: 'DNI', value: 'dni' },
            { text: 'Nombres y apellidos', value: 'datos' },
            { text: 'Profesión', value: 'profesion' },
            { text: 'Ciudad', value: 'ciudad' },
            { text: 'Estado', value: 'estado' }
        ],
        dni: '',
        datos: '',
        profesion: 'Ingeniería',
        ciudad: 'Tarapoto'
    }),
    computed: {
        asistentes () {
            return this.$store.getters.getAsist
        },
        loading () {
            return this.$store.getters.getLoading
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
                    profesion: this.profesion
                })  
            }
        }
    }
}
</script>