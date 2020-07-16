<template>
    <div class="container">
        <PageTitle pageTitle = "State Daily Transactions"></PageTitle>
        <ErrorTip :text="err" v-if="err" />
        <OverLay :loading="loading" />
        <v-layout row wrap class="mx-auto">
            <card  v-for="trans in transactions" :key="trans._id.date" :data="trans" :stationId="stationId" class="mb-2"/>    
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
import card from '~/components/cards/DailyStateTransaction'
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
    computed: { 
        stationId(){
            return this.$route.query.stationId
        },
        state(){
            return this.$route.params.id
        },
        transactions(){
            return this.$store.state.transactions.result
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
            const info = {state : this.state, stationId: this.stationId, page:value}
            return this.$store.dispatch('getDailyStateSaleDetail', info).then(() => {
                return this.$store.dispatch('getStateBranches', info )
            })
        }
    },
    mounted(){
        this.changePage(1)
    }
}
</script>
