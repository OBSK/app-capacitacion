<template>
    <v-container fluid grid-list-md>
        <v-layout wrap>
         <v-flex x12 sm12 md12>
           <v-card flat>
             <v-card-title class="headline">
               Lista de capacitaciones   
               <v-btn @click="exportExcel" color="success" dark>Exportar a excel</v-btn>            
               <v-spacer></v-spacer>
               <v-text-field append-icon="search" label="Buscar capacitación" v-model="searchCapacitacion" ></v-text-field>
             </v-card-title>
             <v-card-text>
               <v-container grid-list-md>
                 <v-layout wrap>
                   <v-flex xs12 sm12 md12>
                     <v-data-table
                      :headers="headersCapacitaciones"
                      :items="itemsCapacitaciones"
                      :search="searchCapacitacion"
                      >
                      <template v-slot:items="props">
                        <td v-if="props.item.numeroregistro"> {{ props.item.numeroregistro }} </td>
                        <td v-else align="center"> --  </td>
                        <td> {{ props.item.nombre }} </td>
                        <td> {{ props.item.institucion }} </td>
                        <td> {{ props.item.ciudad }} </td>
                        <td> {{ props.item.fecha }} </td>
                        <td align="center"> {{ props.item.horas }} </td>
                        <td align="center"> {{ props.item.creditos }} </td>
                        <td>
                            <v-icon round v-if="props.item.estado = true" color="success" small title="El curso se encuentra disponible">check</v-icon>
                            <v-icon round v-else color="red" small title="El curso no se encuentra disponible">clear</v-icon>
                        </td>
                        <td align="center"> {{ props.item.establecimiento }} </td>
                        <td align="center"> {{ props.item.ubigeo }} </td>
                        <td>
                          <v-icon small color="success" @click="dialogDetalle = true, activeItem = props.item.id" title="Ver">zoom_in</v-icon>
                          <v-icon small color="success" @click="dialogEdit = true, activeItem = props.item.id" title="Modificar">edit</v-icon>
                          <v-icon small color="red" @click="deleteCapacitacion(props.item.id)" title="Eliminar">delete</v-icon>
                        </td>
                      </template>
                      <template v-slot:no-data>
                        <h3>No tenemos registros disponibles</h3>
                      </template>
                      </v-data-table>
                   </v-flex>
                   <!-- Dialog Editar Capacitacion -->
                   <v-dialog v-model="dialogEdit" max-width="600px">
                        <v-card>
                            <v-card-title class="headline">Editar {{ itemsEditCapacitaciones.nombre }} </v-card-title>
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
                    <v-card>
                        <v-toolbar card dark color="primary">
                          <v-btn icon dark @click="dialogDetalle = false">
                            <v-icon>close</v-icon>
                          </v-btn>
                          <v-toolbar-title>Detalle de {{ itemsEditCapacitaciones.nombre }} </v-toolbar-title>
                        </v-toolbar>
                        <v-card>
                          <v-card-title class="title"> Capacitadores:</v-card-title>
                          <v-card-text>
                            <v-data-table
                            :items="itemsCapacitadores.datos"
                            hide-headers
                            hide-actions>
                            <template v-slot:items="props">
                              <td> {{ props.index + 1}} </td>
                              <td>
                                <v-avatar size="38px">
                                  <img v-if="props.item.avatar != undefined" :src="props.item.avatar">
                                  <v-icon v-else>people</v-icon>
                                </v-avatar>
                              </td>
                              <td> {{ props.item.datos }} </td>
                              <td>
                                <v-btn small color="success" @click="dialogCapacitador = true; capacitadorSearch = props.item.id">Ver</v-btn>
                              </td>
                            </template>
                            </v-data-table>
                            <!-- Vista Capacitador -->
                            <v-dialog v-model="dialogCapacitador" max-width="600px">
                              <v-card>
                                <v-card-title class="title"> Capacitador {{ itemsViewsCapacitador.datos }} </v-card-title>
                                <v-card-text>
                                  <v-flex xs12 sm12 md12>
                                    <h3>DNI: {{ itemsViewsCapacitador.dni }} </h3>
                                  </v-flex>
                                  <v-flex xs12 sm12 md12>
                                    <h3>Profesion: {{ itemsViewsCapacitador.profesion }} </h3>
                                  </v-flex>
                                  <v-flex xs12 sm12 md12>
                                    <h3>Registrado {{ moment(itemsViewsCapacitador.registro).lang('es').fromNow()  }} </h3>
                                  </v-flex>
                                  <v-flex xs12 sm12 md12>
                                    <h3>Ciudad {{ itemsViewsCapacitador.ciudad  }} </h3>
                                  </v-flex>
                                  <v-flex xs12 sm12 md12>
                                    <h3>Estado: <v-icon color="green" title="Habilitado">check</v-icon> </h3>
                                  </v-flex>
                                </v-card-text>
                              </v-card>
                            </v-dialog>
                            <v-spacer></v-spacer>
                            <div size="300px">
                              <v-toolbar flat color="white" >
                                <v-toolbar-title>Personal a capacitar </v-toolbar-title>
                                <v-divider
                                  class="mx-2"
                                  inset
                                  vertical
                                ></v-divider>
                                <v-btn color="success" @click="dialogCap = true">
                                  Nuevo
                                </v-btn>
                                <!-- Seleccionar personal a capacitarse -->
                                <!-- Modal capacitador -->
                                <v-dialog v-model="dialogCap" max-width="800px">
                                    <v-card>
                                        <v-card-title class="headline">Buscar Asistente
                                            <v-spacer></v-spacer>
                                        <v-text-field append-icon="search" label="Buscar" single-line hide-details v-model="searchCapacitador2"></v-text-field>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-container grid-list-md>
                                                <v-layout wrap>
                                                    <v-flex xs12 sm12 md12>
                                                        <v-data-table
                                                        :headers= "headers2"
                                                        :items = "asistentes"
                                                        :search = "searchCapacitador2">
                                                        <template v-slot:items="props">
                                                            <td> {{ props.item.dni }} </td>
                                                            <td class="text-uppercase"> {{ props.item.datos }} </td>
                                                            <td> {{ props.item.profesion }} </td>
                                                            <td> {{ props.item.ciudad }} </td>
                                                            <td>
                                                                <v-btn small color="success" @click="agregarItem(props.item)"> Agregar </v-btn>
                                                            </td>
                                                        </template>
                                                        <template v-slot:no-data>
                                                                No tenemos registrado ningún capacitador aún.
                                                        </template>
                                                        <template v-slot:no-results>
                                                            <v-alert :value="true" color="error" icon="warning">
                                                                La búsqueda para {{ searchCapacitador2 }} no obtuvo resultados
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
                              </v-toolbar>
                              <v-data-table
                              :headers="headers"
                              :items="capacitados.datos">
                                <template v-slot:items="props">
                                  <td> {{ props.item.dni }} </td>
                                  <td> {{ props.item.datos }} </td>
                                  <td> {{ props.item.profesion }} </td>
                                  <td> {{ props.item.ciudad }} </td>
                                  <td  title="Cantidad de horas capacitadas" >  {{ props.item.horascapacitadas }}</td>
                                  <td>
                                    <v-btn dark v-if="Number(props.item.horascapacitadas) < Number(itemsEditCapacitaciones.horas)" small color="red" @click="dialogRegistrarCapacitacion = true; activeItemEdit = props.item">En curso</v-btn>
                                    <v-btn dark v-else color="success" small>Capacitado</v-btn>
                                  </td>
                                  <td>
                                    <v-icon color="red" small @click="deleteAsistente(props.item)" title="Eliminar asistente">delete</v-icon>
                                  </td>
                                  <v-dialog v-model="dialogRegistrarCapacitacion" max-width="640px">
                                    <v-card>
                                      <v-card-title class="title">Registrar capacitación de {{ activeItemEdit.datos }}</v-card-title>
                                        <v-card-text>
                                          <h3>Cantidad de horas totales: {{ itemsEditCapacitaciones.horas }} </h3>
                                          <h3>Cantidad de horas recibidas: {{ activeItemEdit.horascapacitadas }} </h3>
                                          <v-text-field label="Ingrese cantidad de horas de capacitación" type="number" v-model="horastotales"></v-text-field>
                                          <h3>Cantidad de horas restantes: {{ Number(itemsEditCapacitaciones.horas) - Number(activeItemEdit.horascapacitadas) - Number(horastotales) }} </h3>
                                        </v-card-text>
                                        <v-card-actions>
                                          <v-spacer></v-spacer>
                                          <v-btn @click="registrarHorasCapacitadas(props.item)" color="primary">Registrar Capacitación </v-btn>
                                        </v-card-actions>
                                      </v-card>
                                  </v-dialog>
                                </template>
                                <template v-slot:no-data>
                                  <h3>No tenemos personas a capacitarse aquí</h3>
                                </template>
                              </v-data-table>
                            </div>
                          </v-card-text>
                        </v-card>
                        <!-- <v-card>
                          <v-list two-line>
                          <v-subheader> Capacitadores: </v-subheader>
                          <v-divider></v-divider>
                          <v-list-tile-avatar>
                            <img src="itemsCapacitadores.datos.avatar">
                          </v-list-tile-avatar>
                          <p> {{ itemsCapacitadores.datos[0].nombre }} </p>
                        </v-list>
                        </v-card> -->
                    </v-card>
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
import XLSX from 'xlsx'
export default {
    data: () => ({
      email: '',
      password: '',
      moment: moment,
      myStyle: {
        backgroundColor: '#607D8B'
      },
      headersCapacitaciones: [
        {text: 'N° Registro', value: 'numeroregistro'},
        {text: 'Nombre de la capacitación', value: 'nombre'},
        {text: 'Institución', value: 'nombre'},
        {text: 'Ciudad', value: 'ciudad'},
        {text: 'Fecha', value: 'fecha'},
        {text: 'Horas', value: 'horas'},
        {text: 'Créditos', value: 'creditos'},
        {text: 'Estado', value: 'estado'},
        { text: 'Establecimiento', value: 'establecimiento'},
        { text: 'Ubigeo', value: 'ubigeo'},
        {text: 'Opciones', value: ''}
      ],
      headers: [
        { text: 'DNI', value: 'dni' },
        { text: 'Nombres y apellidos', value: 'datos' },
        { text: 'Profesión', value: 'profesion' },
        { text: 'Ciudad', value: 'ciudad' },
        { text: 'Horas Cap', value: 'horascap' },
        { text: 'Estado', value: 'estado' },
        { text: 'Opciones', value: '' }
      ],
      headers2: [
        { text: 'DNI', value: 'dni' },
        { text: 'Nombres y apellidos', value: 'datos' },
        { text: 'Profesión', value: 'profesion' },
        { text: 'Ciudad', value: 'ciudad' },
        { text: 'Opciones', value: '' }
      ],
      searchCapacitacion: '',
      dialogEdit: false,
      dialogDetalle: false,
      dialogCap: false,
      dialogRegistrarCapacitacion: false,
      activeItem: '',
      activeItem2: '',
      searchCapacitador2: '',
      menu: false,
      horastotales: '',
      activeItemEdit: '',
      dialogCapacitador: false,
      capacitadorSearch: ''
    }),
    computed: {
      itemsCapacitaciones () {
        return this.$store.getters.getCapacitacion
      },
      itemsViewsCapacitador () {
        return this.$store.getters.getAsist.find(data => {
          if(data.id == this.capacitadorSearch) {
            return data
          }
        }) || []
      },
      itemsEditCapacitaciones () {
        return this.$store.getters.getCapacitacion.find(data => {
          if(data.id == this.activeItem) {
            return data
          }
        }) || []
      },
      itemsCapacitadores () {
        return this.$store.getters.getCapacitadores.find(data => { return data.id == this.activeItem }) || []
      },
      asistentes () {
        return this.$store.getters.getAsist
      },
      capacitados () {
        return this.$store.getters.getAsistentesCapacitacion.find(data => { return data.id == this.activeItem }) || []
      },
      asistentesEdit() {
        return this.$store.getters.getAsistentesCapacitacion.find(data => {
          console.log(data.datos.idCap, this.activeItemEdit)
          if(data.idCap == this.activeItemEdit) {
            return data
          }     
        }) || []
      },
      capacitadosToExcel () {
        return this.$store.getters.getAsist
      },
      institucionList () {
        return this.$store.getters.getInstituciones
      },
      ciudadList () {
        return this.$store.getters.getCiudadList
      },
      computedDateFormattedMomentjs () {
            return this.itemsEditCapacitaciones.fecha ? moment(this.itemsEditCapacitaciones.fecha).format('DD/MM/YYYY') : ''
      },
      validar () {
        return true
      }
    },
    methods: {
      deleteCapacitacion(id) {
        this.$store.dispatch('deleteCapacitacion', id)
      },
      updateCapacitacion(data) {
        this.dialogEdit = false
        this.$store.dispatch('updateCapacitacion', data)
      },
      agregarItem(asistente) {
            this.dialogCap == false
            // const record = this.asistentes.find(data => {
            //   this.capacitados.forEach(el => {
            //     console.log(el)
            //     if(el.id == data.id) {
            //       console.log('El asistente ya se encuentra registrado')
            //     } else {
            //       console.log('El asistente no se encuentra registrado')
            //     }
            //   })
            // })
            this.$store.dispatch('registrarAsistentesCapacitacion' , {
              asistente: asistente,
              id: this.itemsEditCapacitaciones.id,
              capacitacion: this.capacitados
            })
      },
      eliminarCap(id) {
            this.$store.dispatch('deleteAsistente', id)

      },
      registrarHorasCapacitadas(data) {
        this.$store.dispatch('registrarHorasCapacitadas', {
          idcapacitacion: this.activeItem,
          data: this.activeItemEdit,
          totalhoras: this.horastotales
        })
      },
      deleteAsistente(data) {
        this.$store.dispatch('deleteAsistente', {
          idcapacitacion: this.activeItem,
          data: data
        })
      },
      exportExcel () {
        let data = XLSX.utils.json_to_sheet(this.capacitadosToExcel)
        const workbook = XLSX.utils.book_new()
        const filename = 'Reporte al ' + moment().format('DD-MM-YYYY') 
        XLSX.utils.book_append_sheet(workbook, data, filename)
        XLSX.writeFile(workbook, `${filename}.xlsx`)
      }
    }
}
</script>
