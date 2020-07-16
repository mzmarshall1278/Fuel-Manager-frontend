<template>
    <div class="container">
        <PageTitle pageTitle = "Pumps"></PageTitle>
        <div class="marshall--text" v-if="!pumps.length > 0">You have not added any pumps yet</div>
        <ErrorTip :text="err" v-if="err"/>
    <v-layout row wrap class="mx-auto">
        <card v-for="pump in pumps" :key="pump._id" :number="pump.number" :pumpId="pump._id" :oil="pump.oil"></card>
    <OverLay :loading="loading" />
    </v-layout>
            <v-flex xs12 sm6 md4 pa-1>
                <v-card
                class="mx-auto"
                max-width="500"
                >
                <v-card-actions v-if="user.userType === `branchManager`">
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
    middleware:[
    'checkAuth',
    'Auth'
    ],
    components : {
        card : card
    },
    data(){
        return {
            
               
        }
    },
    computed : {
        user(){
            return this.$store.getters.user
        },
        branchId(){
           return this.$route.query.branchId
        },
        pumps(){
            return this.$store.getters.getPumps;
        },
        loading(){
            return this.$store.getters.loading
        },
        err(){
            return this.$store.getters.error
        }
    },
    methods : {
        addPump(){
            this.$router.push('/pumps/newPump?branchId='+this.branchId)
        },
    },
    
    mounted(){
        return this.$store.dispatch('getPumps', this.branchId)
    }
}
</script>