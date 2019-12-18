<template>
    <v-flex xs12>
    
        <v-card class="mx-auto my-2"
        max-width="600px">
            <v-card-title  class="display-1 marshall--text">
                Reservoir Volume
            </v-card-title>
            <v-card-text>
                <div class="text--primary">
                    <p>Petrol : {{reservoir.petrol}} ltr</p>
                    <p>diesel : {{reservoir.diesel}} ltr</p>
                    <p>Kerosine : {{reservoir.kerosine}} ltr</p>
                </div>
            </v-card-text>

        </v-card>
    </v-flex>
</template>
<script>
export default {
    computed:{
        reservoir(){
            return this.$store.state.reservoir
        }
    },
    mounted(){
        return this.$store.dispatch('getReservoir')
    }
}
</script>
