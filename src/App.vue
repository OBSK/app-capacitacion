<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase hidden-xs-only">
        <span>SISTEMA DE GESTIÓN DE CAPACITADORES</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
      <Error/>
      <router-view/>
      <v-footer>
        <v-card class="flex">
          <v-card-actions class="justify-center">
            &copy;2019 — <strong>By Arturo</strong>
          </v-card-actions>
        </v-card>
      </v-footer>
  </v-app>
</template>
<script>
import Error from './views/Error'
export default {
  components: {
    Error
  }
}
</script>