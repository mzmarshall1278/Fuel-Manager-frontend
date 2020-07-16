<template>
    <div class="container">
        <PageTitle pageTitle = "Stats" class="pa-2"></PageTitle>
    <ErrorTip :text="err" v-if="err" />
    <OverLay :loading="loading " />
        <litreCard class="mb-5"/>

        <reservoirCard class="mb-4" />


    </div>
</template>

<script>
import litreCard from "~/components/cards/LitreCard";   
import reservoirCard from "~/components/cards/ReservoirCard";
export default {

     middleware:[
    'checkAuth',
    'Auth'],
    components : {litreCard, reservoirCard},
    computed :{
        err(){
            return this.$store.getters.error
        },
        loading(){
            return this.$store.getters.loading
        }
    }
}
</script>
