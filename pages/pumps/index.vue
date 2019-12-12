<template>
    <div class="container">
        <PageTitle pageTitle = "Pumps"></PageTitle>
        <div class="marshall--text" v-if="!pumps.length > 0">You have not added any pumps yet</div>
    <v-layout row wrap class="mx-auto">
        <card v-for="pump in pumps" :key="pump._id" :number="pump.number" :pumpId="pump._id"></card>
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
                    @click="addPump"
                >
                    Add New Pump
                </v-btn>
                    </v-card-actions>

                <v-card>          

                    
                </v-card>
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
    data(){
        return {
            
               
        }
    },
    computed : {
        pumps(){
            return this.$store.getters.getPumps;
        },
        branch(){
            return this.$store.state.user.branchId
        },
    },
    methods : {
        addPump(){
            this.$router.push('/pumps/newPump')
        },
    },
    
    mounted(){
        return this.$store.dispatch('getPumps', this.branch)
    }
}
</script>