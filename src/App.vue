<template>
  <v-app>
    <v-navigation-drawer
    v-model="drawer"
    absolute
    temporary>
    <v-list class="pa-1">
      <v-list-tile>
        <v-list-tile-content>Bienvenido</v-list-tile-content>
      </v-list-tile>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile
        v-for="item in menuItems" 
        :key="item.title"
        :to="item.link">
        <v-list-tile-action>
          <v-icon>
            {{ item.icon }}
          </v-icon>
        </v-list-tile-action>
        <v-list-tile-content> {{ item.title }} </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon>logout</v-icon>
        </v-list-tile-action>
        <v-list-tile-content @click="logOut"> Cerrar Sesión</v-list-tile-content>
      </v-list-tile>
    </v-list>
    </v-navigation-drawer>
    <v-toolbar>
      <v-toolbar-side-icon v-if="isAuthenticated" @click="drawer = true"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase hidden-xs-only">
        <span>SISTEMA DE GESTIÓN DE CAPACITADORES </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
      <Error/>
      <router-view/>
      <v-footer>
        <v-card class="flex">
          <v-card-actions class="justify-center">
            <a href="https://www.facebook.com/jorge.huimaruiz" target="_blank">&copy;2019 — <strong >By Arturo</strong></a>
          </v-card-actions>
        </v-card>
      </v-footer>
  </v-app>
</template>
<script>
import Error from './views/Error'
export default {
  data: () => ({
    drawer: false,
    menuItems: [
      { icon: 'home', title: 'Inicio', link: '/' },
      { icon: 'how_to_reg', title: 'Registrar asistente', link: '/registrarasistente' },
      { icon: 'work', title: 'Registrar capacitación', link: '/registrarcapacitacion' },
      { icon: 'person', title: 'Registrar usuario', link: '/registrarusuario' }
    ]
  }),
  components: {
    Error
  },
  computed: {
    isAuthenticated () {
      return this.$store.getters.getUser !== null && this.$store.getters.getUser !==  undefined
    }
  },
  methods: {
    logOut () {
      this.$store.dispatch('userSignOut')
    }
  }
}
</script>