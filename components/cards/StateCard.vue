<template>
    <div class="container">
        <p class="marshall--text headline">{{state._id}}</p>
        <p class="marshall--text title"> Number of Branches : {{state.total}}</p>
        
        <v-layout row wrap class="mx-auto">
                
                    <card v-for="(station,key) in state.stations" :key="key" :station="station" /> 
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
    computed : {
        branches(){
            return this.$store.getters.branches(this.state)
        },
        total (){
            return this.branches.length
        }
    }
}
</script>

