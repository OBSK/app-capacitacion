<template>
    <v-dialog 
    v-model="errorData.error"
    max-width="290">
        <v-card>
            <v-card-title class="headline red darken-2" color="red lighten-1">
                <v-icon>warning</v-icon>
                 Error
            </v-card-title>
            <v-card-text>{{ errorData.data }}</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn title="Entendido" color="red darken-1" @click="clearError">
                    <v-icon>thumb_up</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    data: () => ({
      
    }),
    computed: {
        errorData() {
            return this.$store.getters.getError
        }
    },
    methods: {
        clearError() {
            this.$store.dispatch('clearError')
        }
    }
}
</script>
