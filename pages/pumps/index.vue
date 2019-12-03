<template>
    <div class="container">
        <PageTitle pageTitle = "Pumps"></PageTitle>
    <v-layout row wrap class="mx-auto">
        <card v-for="pump in pumps" :key="pump.id" :number="pump.number" :pumpId="pump.id"></card>
    </v-layout>
            <v-flex xs12 sm6 md4 pa-1>
            <v-card
                class="mx-auto"
                max-width="500"
            >
                <v-card-actions>
                <v-btn large
                    text
                    color="marshall marshall"
                    @click="loadThis"
                >
                    Add New Pump
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
        

    </div>     
</template>
<script>
import card from '~/components/cards/PumpCard'
export default {
    components : {
        card : card
    },
    computed : {
        pumps(){
            return this.$store.getters.getPumps;
        }
    },
    methods :  {
        loadThis(){

        },
    }
}
</script>
