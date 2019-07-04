<template>
    <v-container fluid grid-list-md>
        <v-layout wrap>
         <v-flex x12 sm12 md12>
           <v-card flat>
             <v-card-title class="headline">
               Lista de capacitaciones
               <v-spacer></v-spacer>
               <v-text-field append-icon="search" label="Buscar capacitación" v-model="searchCapacitacion" ></v-text-field>
             </v-card-title>
             <v-card-text>
               <v-container grid-list-md>
                 <v-layout wrap>
                   <v-data-table
                   :headers="headersCapacitaciones"
                   :items="itemsCapacitaciones"
                   :search="searchCapacitacion"
                   >
                   <template v-slot:items="props">
                     <td> {{ props.item.nombre }} </td>
                     <td> {{ props.item.institucion }} </td>
                     <td> {{ props.item.ciudad }} </td>
                     <td> {{ props.item.fecha }} </td>
                     <td align="center"> {{ props.item.horas }} </td>
                     <td align="center"> {{ props.item.creditos }} </td>
                     <td>
                       <v-icon small color="success" @click="dialogDetalle = true" title="Ver">zoom_in</v-icon>
                       <v-icon small color="success" @click="dialogEdit = true, activeItem = props.item.id" title="Modificar">edit</v-icon>
                       <v-icon small color="red" @click="deleteCapacitacion(props.item.id)" title="Eliminar">delete</v-icon>
                     </td>
                   </template>
                   <template v-slot:no-data>
                     <h3>No tenemos registros disponibles</h3>
                   </template>
                   </v-data-table>
                   <!-- Dialog Editar Capacitacion -->
                   <v-dialog v-model="dialogEdit" max-width="600px">
                        <v-card>
                            <v-card-title class="headline">Editar {{ itemsEditCapacitaciones.nombre}} </v-card-title>
                            <v-card-text>
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12 sm6 md8>
                                            <v-text-field label="Nombre" type="text" v-model="itemsEditCapacitaciones.nombre"></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm6 md4>
                                            <v-text-field label="Creditos" type="number" v-model="itemsEditCapacitaciones.creditos"></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm6 md6>
                                          <v-list>
                                            <v-select
                                            label="Institución"
                                            v-model="itemsEditCapacitaciones.institucion"
                                            :items="institucionList">
                                            </v-select>
                                          </v-list>
                                        </v-flex>
                                        <v-flex xs12 sm6 md6>
                                          <v-list>
                                            <v-select
                                            label="Ciudad"
                                            v-model="itemsEditCapacitaciones.ciudad"
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
                                                  v-model="itemsEditCapacitaciones.fecha"
                                                  @change="menu = false"
                                                  locale="es">                                               
                                                  </v-date-picker>
                                              </v-menu>
                                        </v-flex>
                                        <v-flex xs12 sm6 md6>
                                            <v-text-field label="Cantidad de horas" type="number" v-model="itemsEditCapacitaciones.horas"></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn dark color="red" @click="dialogEdit = false" >Cancelar</v-btn>
                                <v-btn dark color="success" @click="updateCapacitacion(itemsEditCapacitaciones)">Actualizar</v-btn>
                            </v-card-actions> 
                        </v-card>
                    </v-dialog>
                    <!-- Dialog Detalle de la capacitación -->
                    <v-dialog
                    v-model="dialogDetalle"
                    fullscreen
                    hide-overlay
                    transition="dialog-bottom-transition"
                    >
                    <v-card-title>
                      <v-toolbar card dark color="primary">
                        <v-btn icon dark @click="dialogDetalle = false">
                          <v-icon>close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Detalle de la capacitación</v-toolbar-title>
                      </v-toolbar>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-list>
                            <v-subheader>
                              Capacitadores inscritos
                            </v-subheader>
                          </v-list>
                        </v-layout>
                      </v-container>
                    </v-card-title>
                    </v-dialog>
                 </v-layout>
               </v-container>
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
      email: '',
      password: '',
      myStyle: {
        backgroundColor: '#607D8B'
      },
      headersCapacitaciones: [
        {text: 'Nombre de la capacitación', value: 'nombre'},
        {text: 'Institución', value: 'nombre'},
        {text: 'Ciudad', value: 'ciudad'},
        {text: 'Fecha', value: 'fecha'},
        {text: 'Cantidad de horas', value: 'horas'},
        {text: 'Cantidad de créditos', value: 'creditos'},
        {text: 'Opciones', value: ''}
      ],
      searchCapacitacion: '',
      dialogEdit: false,
      dialogDetalle: false,
      activeItem: '',
      menu: false
    }),
    computed: {
      itemsCapacitaciones () {
        return this.$store.getters.getCapacitacion
      },
      itemsEditCapacitaciones () {
        return this.$store.getters.getCapacitacion.find(data => {
          if(data.id == this.activeItem) {
            return data
          } else {
            return {
              fecha: moment()
            }
          }
        }) || []
      },
      institucionList () {
        return this.$store.getters.getInstituciones
      },
      ciudadList () {
        return this.$store.getters.getCiudadList
      },
      computedDateFormattedMomentjs () {
            return this.itemsEditCapacitaciones.fecha ? moment(this.itemsEditCapacitaciones.fecha).format('DD/MM/YYYY') : ''
        }
    },
    methods: {
      deleteCapacitacion(id) {
        this.$store.dispatch('deleteCapacitacion', id)
      },
      updateCapacitacion(data) {
        this.dialogEdit = false
        this.$store.dispatch('updateCapacitacion', data)
      }
    }
}
</script>
