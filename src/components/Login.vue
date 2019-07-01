<template>
      <v-container fluid fill-height :style="myStyle">
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar flat color="#CFD8DC">
                <v-toolbar-title>Iniciar Sesión</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="registerUser">
                  <v-text-field prepend-icon="person" name="login" label="Correo electrónico" v-model="email" type="email" required></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" label="Contraseña" v-model="password" type="password" required></v-text-field>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn dark color="#009688" type="submit">Ingresar</v-btn>
                  </v-card-actions>
                </v-form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
</template>

<script>
import axios from 'axios'
  export default {
    data: () => ({
      email: '',
      password: '',
      myStyle: {
        backgroundColor: '#607D8B'
      }
    }),
    methods: {
      registerUser() {
        this.$store.dispatch('loginFirebaseUser', {
          user: this.email,
          password: this.password
        })
      }
    }
  }
</script>

<style scoped>
 .fondo {
   background-color: transparent;
 }
</style>
