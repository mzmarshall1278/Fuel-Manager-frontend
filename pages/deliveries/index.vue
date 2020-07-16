<template>
    <div class="container">
        <PageTitle pageTitle = "Deliveries" class="my-3"></PageTitle>
        <ErrorTip :text="err" v-if="err" />
        <OverLay :loading="loading" />
        <v-btn large class="marshall--text pa-2 my-2" @click="goTo" v-if="user.userType === 'branchManager'">Add new entry</v-btn>
        <v-card class="pa-2 mb-2" v-for="(day, key) in deliveries" :key="key">
            <v-card-title class="marshall white--text mb-1" > Day : {{day._id}} - Deliveries : {{day.totalDeliveries}}</v-card-title>
        
        <v-card-text v-for="(del, key) in day.deliveries" :key="key" class="marshall--text">
            <p>Driver Name: {{del.name}}</p>
            <p>Oil: {{del.oil}}</p>
            <p>Ammount Delivered : {{del.ammount}} ltr</p>
            <p>Price : {{del.price}} NGN</p>
            <hr>
        </v-card-text>
                
        </v-card>

        <div class="text-center marshall--text mt-4">
        <v-pagination
        v-model="page"
        :length="pages"
        :total-visible="7"
        ></v-pagination>
        </div>
    </div>
</template>
<script>
export default {
     middleware:[
    'checkAuth',
    'Auth'],
    data(){
        return {
            page : 1
        }   
    },
    watch:{
        page(value){    
            this.changePage(value)
        }
    },
    computed : {
        deliveries(){
            return this.$store.state.deliveries.result
        },
        pages(){
            return this.$store.state.deliveries.counted
        },
        user(){
            return this.$store.state.user
        },
        branchId(){
            return this.$route.query.branchId
        },
        err(){
            return this.$store.getters.error
        },
        loading(){
            return this.$store.getters.loading
        }
    },
    methods : {
        
        goTo(){
            return this.$router.push('/deliveries/newDelivery?branchId='+this.branchId);
        },
        changePage(value){
            return this.$store.dispatch('getDeliveryLogs', {branchId : this.branchId, page : value});
        }
    },
    mounted(){
        this.changePage(1)
    }
}
</script>
