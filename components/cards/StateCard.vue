<template>
    <div class="container">
        <p class="marshall--text headline">{{state._id}}</p>
        <p class="marshall--text title"> Number of Branches : {{state.total}}</p>
        
        <v-layout row wrap class="mx-auto">
               
                    <card v-for="(station,key) in state.stations" :key="key" :station="station" :path="'branches'" />   
        </v-layout>
            <v-layout class="mt-1">
                 <v-btn @click="loadAll" class="marshall white--text">View all</v-btn>
            </v-layout>
    </div>
</template>
<script>
import card from '~/components/cards/Card'
export default {
    components : {
        card:card
    },
    props:['state'],
    data(){
        return {
            
        }
    },
    methods :{
        loadAll(){
            this.$router.push(`/branches/states/${this.state._id}?stationId=${this.stationId}`)
        }
    },
    computed : {
        branches(){
            return this.$store.getters.branches(this.state)
        },
        // total (){
        //     return this.branches.length
        // },
        stationId(){
            return this.$store.state.user.stationId
        }
    }
}
</script>

