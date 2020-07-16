<template>
    <div class="container">
        <pageTitle :pageTitle="date+' '+ state"/>
        <v-layout row wrap class="mx-auto">
            <card  v-for="trans in transactions" :key="trans._id" :data="trans" :stationId="stationId" :date="date" class="mb-2"/>    
        </v-layout>
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
import  card from "~/components/cards/stateTransactionCard";
export default {
    middleware:[
    'checkAuth',
    'Auth'],
    components :{card},
    data(){
        return {
           page : 1,
        }
    },
    watch:{
        page(value){    
            this.changePage(value)
        }
    },
    computed:{
        date(){
            return this.$route.params.id
        },
        state(){
            return this.$route.query.state
        },
        stationId(){
            return this.$route.query.stationId
        },
        transactions(){
            return this.$store.state.dailyTransactions
        },
         pages(){
        return this.$store.state.transactions.totalCount
        },
        loading(){
            return this.$store.getters.loading
        },
        err(){
            return this.$store.getters.error
        }
    },
    methods : {
        changePage(value){
            return this.$store.dispatch('getStateTransactionDetail', {state : this.state, stationId: this.stationId, page:value, date : this.date});
        }
    },
    mounted(){
        this.changePage(1)
    }
}
</script>
