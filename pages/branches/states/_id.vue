<template>
    <div class="container">
        <pageTitle :pageTitle="'Branches : '+state"></pageTitle>
        <ErrorTip :text="err" v-if="err" />
        <OverLay :loading="loading"></OverLay>

    <v-layout row wrap class="mx-auto my-2 ">
        <v-btn class="marshall--text" @click="newBranch">Add Branch</v-btn>    
    </v-layout>    
    <v-layout row wrap class="mx-auto">
                <card v-for="(branch, key) in branches.result" :key="key" :station="branch" :path="'branches'" />
    </v-layout>

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
import card from "~/components/cards/Card";
export default {
    components : {card},
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
    computed:{
        
        state(){
            return this.$route.params.id
        },
        stationId(){
            return this.$route.query.stationId
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
    methods: {
        changePage(value){
            return this.$store.dispatch('getStateBranches', {page:value, state:this.state, stationId: this.stationId});
        },
        newBranch(){
            this.$router.push('/branches/newBranch?stationId='+this.stationId);
        }
    },
    mounted(){
            this.changePage(1);
        }
}
</script>
