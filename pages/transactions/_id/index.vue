<template>
    <div class="container">
        <pageTitle :pageTitle="`Detailed Sale on ${id}`"></pageTitle>

        <v-card class="mt-3 pa-2">
            <!-- {{transactions}} -->
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
            return this.$store.state.user.branchId
        },
        transactions(){
            return this.$store.state.dailyTransactions
        }
    },
    mounted(){

        const info = {
            date : this.id,
            branch : this.branch
        }
        this.$store.dispatch('getTransactionDetail', info)
    }
    
}
</script>

