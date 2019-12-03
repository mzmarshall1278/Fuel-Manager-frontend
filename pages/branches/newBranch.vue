<template>
    <div class="container">
        <PageTitle pageTitle="Add New Branch"></PageTitle>
        <v-card>
            <v-form @submit.prevent="addBranch">

            </v-form>
        </v-card>
    </div>
</template>
<script>
export default {
    data(){
        return {
            name : "", manager : "", address : "", state : "",
        }
    },
    methods :{
        addBranch(){
            const branch = {
                name : this.name,
                manager : this.manager,
                address : this.address,
                state : this.state,
                newState : this.newState
            };
            //vuex
            this.$store.dispatch('addBranch', branch);

        }
    }
}
</script>
