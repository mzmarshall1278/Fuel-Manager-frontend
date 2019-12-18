<template>
    <div class="container">
        <PageTitle pageTitle = "Deliveries" class="my-3"></PageTitle>

        <v-btn large class="marshall--text pa-2 my-2" @click="goTo">Add new entry</v-btn>
        <v-card class="pa-2 mb-2" v-for="(day, key) in deliveries" :key="key">
            <v-card-title>Day : {{day._id}} - Deliveries : {{day.totalDeliveries}}</v-card-title>

        <v-card-text v-for="(del, key) in day.deliveries" :key="key" class="marshall--text">
            <p>Driver Name: {{del.name}}</p>
            <p>Oil: {{del.oil}}</p>
            <p>Ammount Delivered : {{del.ammount}} ltr</p>
            <p>Price : {{del.price}} NGN</p>
        </v-card-text>
                <hr>
                
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
    },
    methods : {
        goTo(){
            return this.$router.push('/deliveries/newDelivery');
        },
        getDeliveries(){
            return this.$store.dispatch('getDeliveryLogs')
        }
    },
    mounted(){
        this.getDeliveries()
    }
}
</script>
