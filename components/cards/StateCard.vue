<template>
    <div class="container">
        <p class="marshall--text headline">{{state}}</p>
        <p class="marshall--text title"> Number of Branches : {{total}}</p>
        
        <v-layout row wrap class="mx-auto">
                
                    <card v-for="(branch,id) in branches" :key="id" :id="branch.id" :branchNumber="branch.branchNumber" :name="branch.name" /> 
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

