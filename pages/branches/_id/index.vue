<template>
    <div class="container">
        <pageTitle :pageTitle="`Branch : ${branch.name} - ${branch.state}`" class="mb-3"></pageTitle>

        <v-card class="py-4 px-10 marshall--text ml-5 headline">
            <p>Branch Manager : {{branch.managerId ? branch.managerId: "Not assigned"}}</p>
            <p>Branch Name : {{branch.name}}</p>
            <p>Branch Address : {{branch.address}}</p>
            <p>Total Pumps : {{branch.pumps}}</p> 
            <v-btn
                text
                color="marshall marshall"
                @click="loadThis"
            >
                View
            </v-btn>
            </v-card>  
        
    </div>
</template>
<script>
export default {
    middleware:[
    'checkAuth',    
    'Auth'
    ],
    computed : {
        id(){
            return this.$route.params.id
        },
 
        // state(){
        //     return this.$route.query.state
        // },
        branch(){
                return this.$store.getters.getSingleBranch(this.id )
        }
    },
    methods:{
        loadThis(){
            this.$router.push('/pumps?branchId='+this.branch._id)
        }
    }
    // mounted(){
    //     return this.$store.dispatch('getSingleBranch')
    // }
}
</script>

