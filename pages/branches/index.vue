<template>
    <div class="container">
        <PageTitle pageTitle = "Branches"></PageTitle>
    <v-layout row wrap class="mx-auto">
            <card v-for="(state, id) in states" :key="id" :state="state.name">
            </card>
        <v-flex xs12 sm6 md4 pa-1>
        <v-card
            class="mx-auto"
            max-width="500"
        >
            <v-card-actions>
            <v-btn large
                text
                color="marshall marshall"
                @click="loadThis"
            >
                New Branch
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-flex>
        </v-layout>

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
            
        }
    },
    computed : {
        states () {
            return this.$store.state.states
        },
        
    },
    methods : {
        loadThis (){
            this.$router.push('/branches/newBranch')
        }
    }
}
</script>
