<template>
    <div class="container">
        <PageTitle pageTitle = "Deliveries" class="my-3"></PageTitle>

        <v-btn large class="marshall--text pa-2 my-2" @click="goTo">Add new entry</v-btn>
        <v-card class="pa-10">
            {{deliveries}}
        </v-card>

    </div>
</template>
<script>
export default {
    data(){
        return {
            
        }
    },
    computed : {
        deliveries(){
            return this.$store.state.deliveries
        },
        branchId(){
            return this.$store.state.user.branchId
        },
    },
    methods : {
        goTo(){
            return this.$router.push('/deliveries/newDelivery');
        },
        getDeliveries(){
            return this.$store.dispatch('getDeliveryLogs',  {branchId : this.branchId})
        }
    },
    mounted(){
        this.getDeliveries()
    }
}
</script>
