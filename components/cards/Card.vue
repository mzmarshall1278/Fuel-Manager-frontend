<template>
    <v-flex xs12 sm6 md4 pa-1>
        <v-card
            class="mx-auto"
            max-width="500"
        >
         <v-card-text>
            <p class="title marshall--text text-center">
                Branch: {{station.branchNumber}}
            </p>
            <p class="title marshall--text text-center" >
                {{station.name}}
            </p>
            </v-card-text>
            <v-card-actions>
            <v-btn
                text
                color="marshall marshall"
                @click="loadThis"
            >
                View
            </v-btn>
            </v-card-actions>
           
        </v-card>   
    </v-flex>
</template>
<script>
export default {
    props :['station', 'path'],
    methods : {
    loadThis(){

        if(this.path === 'branches'){
            this.$router.push('/'+this.path+'/'+this.station._id+'?state='+this.station.state)
        }else{
            this.$router.push('/'+this.path+'/?branchId='+this.station._id)
        }
        
    }
}
}

</script>
