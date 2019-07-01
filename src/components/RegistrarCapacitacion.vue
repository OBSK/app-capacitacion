<template>
    <v-container fluid grid-list-md> 
        <v-layout wrap>
            <v-flex xs12 sm6 md6>
                <v-card flat>
                    <v-card-title class="headline">
                        <v-icon>book</v-icon>
                        Registrar capacitación
                    </v-card-title>
                        <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                     <v-flex xs12 sm6 md5>
                                         <v-text-field label="Cantidad de horas" type="number" hint="8 caracteres" v-model="horas" max-length="8" min-length="8"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md7>
                                        <v-text-field label="Nombre de la capacitación" type="text" v-model="nombre"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-list>
                                            <v-select
                                            label="Institución"
                                            v-model="institucion"
                                            :items="institucionList">
                                            </v-select>
                                        </v-list>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-list>
                                            <v-select
                                            label="Lugar"
                                            v-model="ciudad"
                                            :items="ciudadList">
                                            </v-select>
                                        </v-list>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-menu
                                        v-model="menu"
                                        :close-on-content-click="false"
                                        full-width
                                        max-width="290">
                                            <template v-slot:activator="{ on }">
                                                <v-text-field
                                                :value="computedDateFormattedMomentjs"
                                                label="Fecha"
                                                readonly
                                                v-on="on"></v-text-field>
                                            </template>
                                            <v-date-picker
                                            color="green lighten-1"
                                            v-model="date1"
                                            @change="menu = false"
                                            locale="es">                                               
                                            </v-date-picker>
                                        </v-menu>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-text-field label="Cantidad de créditos" type="number" required></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="dialogCap = true" dark color="grey darken-2" :loading="loading">
                                <v-icon>work_outline</v-icon>
                                Agregar capacitador
                            </v-btn>
                        </v-card-actions>
                        <!-- Modal capacitador -->
                        <v-dialog v-model="dialogCap" max-width="800px">
                            <v-card>
                                <v-card-title class="headline">Buscar Capacitador</v-card-title>
                                <v-card-text>
                                    <v-container grid-list-md>
                                        <v-layout wrap>
                                            <v-flex xs12 sm12 md12>
                                                <v-data-table
                                                :headers= "headersCap"
                                                :items = "asistentes">
                                                <template v-slot:items="props">
                                                    <td> {{ props.item.dni }} </td>
                                                    <td> {{ props.item.datos }} </td>
                                                    <td> {{ props.item.profesion }} </td>
                                                    <td> {{ props.item.ciudad }} </td>
                                                    <td v-if="props.item.estado = true">
                                                        <v-btn small color="success"> Agregar </v-btn>
                                                    </td>
                                                    <td v-else>
                                                        <v-btn small color="red">En curso</v-btn>
                                                    </td>
                                                </template>
                                                </v-data-table>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-card-text>
                            </v-card>
                        </v-dialog>
                </v-card>
            </v-flex>
            <v-flex xs12 sm6 md6>
                <v-card flat>
                    <v-card-title class="headline"> Lista de capacitadores</v-card-title>
                    <v-data-table
                    :headers="headers"
                    :items="asistentes">
                    <template v-slot:no-data>
                        <v-alert :value="true" color="success" icon="check">
                            No has agregado ningún capacitador aún.
                        </v-alert>
                    </template>
                    </v-data-table>
                    <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="registrarAsist" dark color="green darken-2" :loading="loading">
                                <v-icon>work_outline</v-icon>
                                Registrar capacitación
                            </v-btn>
                        </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>            
    </v-container>
</template>
<script>
import moment from 'moment'
export default {
    data: () => ({
        institucionList: ['Universidad César Vallejo', 'Universidad Nacional', 'UCP', 'UNI', 'UPEU', 'Otros'],
        ciudadList: ['Tarapoto', 'Moyobamba', 'Juanjui', 'Bellavista', 'Chiclayo', 'Lima', 'Otros'],
        headers: [
            { text: 'DNI', value: 'dni' },
            { text: 'Nombres y apellidos', value: 'datos' },
            { text: 'Profesión', value: 'profesion' },
            { text: 'Ciudad', value: 'ciudad' },
            { text: 'Estado', value: 'estado' }
        ],
        headersCap: [
            { text: 'DNI', value: 'dni' },
            { text: 'Nombres y apellidos', value: 'datos' },
            { text: 'Profesión', value: 'profesion' },
            { text: 'Ciudad', value: 'ciudad' },
            { text: 'Estado', value: 'estado' }
        ],
        menu: false,
        dialogCap: false,
        moment: moment.locale('es'),
        modalCapacitadores: false,
        date1: new Date().toISOString().substr(0, 10),
        horas: '',
        nombre: '',
        institucion: 'Universidad César Vallejo',
        profesion: 'Ingeniería',
        ciudad: 'Tarapoto'
    }),
    computed: {
        asistentes () {
            return this.$store.getters.getAsist
        },
        loading () {
            return this.$store.getters.getLoading
        },
        computedDateFormattedMomentjs () {
            return this.date1 ? moment(this.date1).format('DD/MM/YYYY') : ''
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
