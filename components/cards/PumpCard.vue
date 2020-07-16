<template>
        <v-flex xs12 sm6 md4 pa-1>
        <v-card
            class="mx-auto"
            max-width="500"
        >   
        <v-card-text  class="marshall--text">
            <p>Pump : {{number}}</p>
            <p>Oil : {{oil}}</p>
        </v-card-text>
            <v-card-actions v-if="user.userType === `branchManager`">
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
    props : ['number', 'pumpId', 'oil'],
    computed :{
       branchId(){
           return this.$store.state.user.branchId
       },
       user(){
           return this.$store.getters.user
       }
    },
    methods : {
        loadThis(){
            this.$router.push('/pumps/'+this.pumpId+"?branchId="+this.branchId)
        }
    }
    
}
</script>
