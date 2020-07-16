<template>
    <div class="container">
        <PageTitle pageTitle = "Branches"></PageTitle>
    <v-layout row wrap class="mx-auto">
        <ErrorTip :text="err" v-if="err" />
        <OverLay :loading="loading" />
            <card v-for="(state, id) in states" :key="id" :state="state">
            </card>
        </v-layout>
    {{branches}}
    <div class="text-center marshall--text mt-4">
        <v-pagination
        v-model="page"
        :length="branches.pages"
        :total-visible="7"
        ></v-pagination>
    </div>

    </div>     
</template>
<script>
import card from '~/components/cards/StateCard'
export default {
    components : {
        card:card
    },  
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
        states () {
            return this.$store.state.states
        },
        loading(){
            return this.$store.getters.loading
        },
        branches(){
            return this.$store.state.stateBranches
        },
        err(){
            return this.$store.state.error
        }

    },
    methods : {
        loadThis (){
            this.$router.push('/branches/newBranch')
        },
        changePage(value){
            return this.$store.dispatch('getAllBranches', value);
        },
    },
     mounted(){
            this.changePage(1);
        }
}
</script>
