<template>
    <v-container fluid grid-list-md> 
        <v-layout wrap>
            <v-flex xs12 sm12 md6>
                <v-card flat>
                    <v-card-title class="headline">
                        <v-icon>book</v-icon>
                        Registrar capacitación
                        <v-spacer></v-spacer>
                            <v-btn @click="dialogCap = true" dark color="teal darken-3" :loading="loading">
                                <v-icon>search</v-icon>
                                Agregar capacitador
                            </v-btn>
                    </v-card-title>
                        <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12 sm12 md6>
                                        <v-text-field label="Nombre de la capacitación" type="text" v-model="nombre"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm12 md6>
                                        <v-text-field label="Registro N°" type="number" v-model="numeroregistro"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm12 md3>
                                         <v-text-field label="Cantidad de horas"  type="number" v-model="creditos" max-length="8" min-length="8"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm12 md2>
                                        <v-text-field label="Créditos" type="number" disabled v-model="creditos" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm12 md7>
                                        <v-text-field label="Lugar de la capacitación" type="text" v-model="direccion"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm12 md6>
                                        <v-text-field label="Institución" type="text" v-model="institucion" required></v-text-field>
                                        <!-- <v-list>
                                            <v-select
                                            label="Institución"
                                            menu-props="auto"
                                            v-model="institucion"
                                            :items="institucionList">
                                            </v-select>
                                        </v-list> -->
                                    </v-flex>
                                    <v-flex xs12 sm12 md6>
                                            <v-select
                                            label="Micro Red"
                                            menu-props="auto"
                                            v-model="microred"
                                            return-object="true"
                                            :hint="`${microred.text}, ${microred.code}`"
                                            persistent-hint
                                            :items="ciudadList">
                                            </v-select>
                                    </v-flex>
                                    <v-flex xs12 sm12 md4>
                                        <v-menu
                                        v-model="menu"
                                        :close-on-content-click="false"
                                        full-width
                                        max-width="290">
                                            <template v-slot:activator="{ on }">
                                                <v-text-field
                                                :value="computedDateFormattedMomentjs"
                                                label="Fecha de inicio"
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
                                    <v-flex xs12 sm12 md4>
                                        <v-menu
                                        v-model="menu2"
                                        :close-on-content-click="false"
                                        full-width
                                        max-width="290">
                                            <template v-slot:activator="{ on }">
                                                <v-text-field
                                                :value="computedDateFormattedMomentjs2"
                                                label="Fecha de termino"
                                                readonly
                                                v-on="on"></v-text-field>
                                            </template>
                                            <v-date-picker
                                            color="green lighten-1"
                                            v-model="date2"
                                            :min="minDate"
                                            @change="menu2 = false"
                                            locale="es">                                               
                                            </v-date-picker>
                                        </v-menu>
                                    </v-flex>
                                    <v-flex xs12 sm12 md4>
                                        <v-select
                                        label="Establecimiento"
                                        menu-props="auto"
                                        v-model="establecimiento"
                                        return-object="true"
                                        :items="establecimientoList"
                                        item-text="descripcion"
                                        >
                                        </v-select>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            
                        </v-card-actions>
                        <!-- Modal capacitador -->
                        <v-dialog v-model="dialogCap" max-width="800px">
                            <v-card>
                                <v-card-title class="headline">Buscar Capacitador
                                    <v-spacer></v-spacer>
                                <v-text-field append-icon="search" label="Buscar" single-line hide-details v-model="searchCapacitador"></v-text-field>
                                </v-card-title>
                                <v-card-text>
                                    <v-container grid-list-md>
                                        <v-layout wrap>
                                            <v-flex xs12 sm12 md12>
                                                <v-data-table
                                                :headers= "headers"
                                                :items = "asistentes"
                                                :search = "searchCapacitador">
                                                <template v-slot:items="props">
                                                    <td> {{ props.item.dni }} </td>
                                                    <td class="text-uppercase"> {{ props.item.datos }} </td>
                                                    <td> {{ props.item.profesion }} </td>
                                                    <td> {{ props.item.ciudad }} </td>
                                                    <td> {{ props.item.condicion }} </td>
                                                    <td v-if="props.item.estado = true" align="center">
                                                        <v-icon v-if="props.item.condicion == 'ALUMNO'" color="orange" dark title="El personal solicitado es un alumno">warning</v-icon>
                                                        <v-btn v-else small color="success" @click="agregarItem(props.item)" title="Click para agregar"> Agregar </v-btn>
                                                    </td>
                                                    <td v-else>
                                                        <v-btn small color="red" dark>En curso</v-btn>
                                                    </td>
                                                </template>
                                                <template v-slot:no-data>
                                                        No tenemos registrado ningún capacitador aún.
                                                </template>
                                                <template v-slot:no-results>
                                                    <v-alert :value="true" color="error" icon="warning">
                                                        La búsqueda para {{ searchCapacitador }} no obtuvo resultados
                                                    </v-alert>
                                                </template>
                                                </v-data-table>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="red" dark small @click="dialogCap = false"> Cerrar</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <!-- Dialog Confirmacion -->
                        <v-dialog
                        v-model="dialogConfirm"
                        max-width="290">
                            <v-card>
                                <v-card-title class="headline">Confirmación</v-card-title>
                                <v-divider></v-divider>
                                <v-card-text class="subheading">¿Está seguro de guardar los datos registrados?</v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn dark color="red darken-1" @click="dialogConfirm = false">Cancelar</v-btn>
                                    <v-btn dark color="green darken-1" @click="registrarCap">Confirmar</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                </v-card>
            </v-flex>
            <v-flex xs12 sm12 md6>
                <v-card flat>
                    <v-card-title class="headline"> Lista de capacitadores </v-card-title>
                    <v-data-table
                    :headers="headersCap"
                    :items="capacitadores">
                    <template v-slot:items="props">
                        <td> {{ props.item.dni }} </td>
                        <td> {{ props.item.datos }} </td>
                        <td> {{ props.item.profesion }} </td>
                        <td> {{ props.item.ciudad }} </td>
                        <td align="center"> <v-icon small color="red" @click="eliminarCap(props.item.id)">delete</v-icon> </td>
                    </template>
                    <template v-slot:no-data>
                        <v-alert :value="true" color="success" icon="check">
                            No has agregado ningún capacitador aún.
                        </v-alert>
                    </template>
                    </v-data-table>
                    <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn  @click="dialogConfirm = true" dark color="green darken-2" :loading="loading" :disabled="disabledCapacitadores">
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
        headers: [
            { text: 'DNI', value: 'dni' },
            { text: 'Nombres y apellidos', value: 'datos' },
            { text: 'Profesión', value: 'profesion' },
            { text: 'Ciudad', value: 'ciudad' },
            { text: 'Estado', value: 'estado' },
            { text: 'Opciones'}
        ],
        headersCap: [
            { text: 'DNI', value: 'dni' },
            { text: 'Nombres y apellidos', value: 'datos' },
            { text: 'Profesión', value: 'profesion' },
            { text: 'Ciudad', value: 'ciudad' },
            { text: 'Opciones', value: 'estado'}
        ],
        menu: false,
        menu2: false,
        dialogCap: false,
        dialogConfirm: false,
        searchCapacitador: '',
        moment: moment.locale('es'),
        modalCapacitadores: false,
        date1: new Date().toISOString().substr(0, 10),
        date2: new Date().toISOString().substr(0, 10),
        minDateLog: new Date().toISOString().substr(0, 10),
        horas: '',
        nombre: '',
        institucion: 'Universidad César Vallejo',
        ciudad: {text: 'TARAPOTO', code: '133001'},
        establecimiento: { descripcion: 'HUAYCO TARAPOTO', codDep: '22', codProv: '09', codDist: '01', code: '133001' },
        creditos: '',
        direccion: '',
        numeroregistro: '',
        microred: {text: 'TARAPOTO', code: '133001'}
    }),
    computed: {
        asistentes () {
            return this.$store.getters.getAsist
        },
        capacitadores () {
            return this.$store.getters.getCapacitador
        },
        loading () {
            return this.$store.getters.getLoading
        },
        computedDateFormattedMomentjs () {
            return this.date1 ? moment(this.date1).format('DD/MM/YYYY') : ''
        },
        computedDateFormattedMomentjs2 () {
            return this.date2 ? moment(this.date2).format('DD/MM/YYYY') : ''
        },
        minDate () {
            return this.date1 ? moment(this.date1).format('YYYY-MM-DD') : ''
        },
        disabledCapacitadores () {
            if(this.$store.getters.getCapacitador.length == 0) {
                return true
            } else {
                return false
            }
        },
        ciudadList () {
            return this.$store.getters.getMicroRed
        },
        establecimientoList () {
            return this.$store.getters.getEstablecimiento.filter(data => {
                if(data.code == this.microred.code) {
                    return data
                }
            })
        }
    },
    methods: {
        registrarCap() {
           if(this.nombre == "" || this.creditos == ""  || this.institucion == "" || this.numeroregistro == "") {
               alert("Campos vacíos. Por favor complete los campos")
           } else {
               this.$store.dispatch('registerCapacitacion', {
                   nombre: this.nombre,
                   horas: this.creditos,
                   creditos: this.creditos,
                   institucion: this.institucion,
                   ciudad: this.microred,
                   fecha: this.computedDateFormattedMomentjs,
                   fechatermino: this.computedDateFormattedMomentjs2,
                   capacitadores: this.capacitadores,
                   establecimiento: this.establecimiento,
                   direccion: this.direccion,
                   numeroregistro: this.numeroregistro
               })
           }
        },
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
        },
        agregarItem(capacitador) {
            this.modalCapacitadores == false
            this.$store.dispatch('addCapacitador' , capacitador)
        },
        eliminarCap(id) {
            this.$store.dispatch('deleteCapacitador', id)

        }
    }
}
</script>
