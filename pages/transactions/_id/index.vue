<template>
    <div class="container">
        <pageTitle :pageTitle="`Detailed Sale on ${id}`"></pageTitle>
        <PageTitle pageTitle = "Daily Transactions"></PageTitle>
        <ErrorTip :text="err" v-if="err" />
        <OverLay :loading="loading" />
        <v-card class="mt-3 pa-2">
            
                <card v-for="transaction in transactions" :key="transaction._id" :transaction="transaction"/>
            
        </v-card>
    </div>
</template>
<script>
import card from '~/components/cards/TransactionCard'
export default {        
    components:{
        card
    },
    data(){
        return {

        }
    },
    computed :{
        id(){
           return this.$route.params.id
        },
        branch(){
            return this.$route.query.branchId
        },
        transactions(){
            return this.$store.state.dailyTransactions
        },
        loading(){
            return this.$store.getters.loading
        },
        err(){
            return this.$store.getters.error
        }
    },
    mounted(){

        const info = {
            date : this.id,
            branch : this.branch
        }
        this.$store.dispatch('getTransactionDetail', info);
    }
    
}
</script>
