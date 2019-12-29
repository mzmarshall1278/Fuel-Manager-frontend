<template>
    <div class="container">
        <PageTitle pageTitle = "Daily Transactions"></PageTitle>
        <ErrorTip :text="err" v-if="err" />
        <OverLay :loading="loading" />
        <v-layout row wrap class="mx-auto">
            <card  v-for="trans in transactions" :key="trans._id" :data="trans" :branch="branchId" class="mb-2"/>    
        </v-layout>
    
  <div class="text-center marshall--text mt-4">
    <v-pagination
      v-model="page"
      :length="Math.ceil(pages)"
      :total-visible="7"
    ></v-pagination>
  </div>

    </div>
</template>
<script>
import card from '~/components/cards/DailyTransaction'
export default {
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
        branchId(){
            return this.$route.query.branchId
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
            return this.$store.dispatch('getDailySaleDetail', {branch : this.branchId, page:value});
        }
    },
    mounted(){
        this.changePage(1)
    }
}
</script>
