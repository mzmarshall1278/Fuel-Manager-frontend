<template>
    <div class="container">
        <pageTitle :pageTitle="state"></pageTitle>
    <v-layout row wrap class="mx-auto">
                <card v-for="(branch, key) in branches.result" :key="key" :station="branch" />
                <OverLay :loading="loading"></OverLay>
    </v-layout>
    </div>
</template>
<script>
import card from "~/components/cards/Card";
export default {
    components :{card},
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
        loading(){
            return this.$store.getters.loading
        },
        branches(){
            return this.$store.state.stateBranches
        }

    },
    methods: {
        changePage(value){
            return this.$store.dispatch('getStateBranches', {page:value, state:this.state});
        }
    },
    mounted(){
            this.changePage(1);
        }
}
</script>
