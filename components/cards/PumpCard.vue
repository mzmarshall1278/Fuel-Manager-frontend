<template>
        <v-flex xs12 sm6 md4 pa-1>
        <v-card
            class="mx-auto"
            max-width="500"
        >
        <v-card-text>
            <p>Pump : {{number}}</p>
        </v-card-text>
            <v-card-actions>
            <v-btn large
                text
                color="marshall marshall"
                @click="loadThis"
            >
               View Pump
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-flex>
</template>
<script>
export default {
    props : ['number', 'pumpId'],
    methods : {
        loadThis(){
            this.$router.push('/pumps/'+this.pumpId)
        }
    }
    
}
</script>
