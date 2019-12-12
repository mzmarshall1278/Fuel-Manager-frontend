<template>
    <v-flex xs12 sm6 md4 pa-1>
        <v-card
            class="mx-auto"
            max-width="500"
        >
         <v-card-text>
            <p class="title marshall--text text-center">
                Branch: {{branchNumber}}
            </p>
            <p class="title marshall--text text-center" >
                {{name}}
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
    props :['name', 'branchNumber', 'id', 'title'],
    methods : {
    loadThis(){
        this.$router.push('/branches/'+this.id)
    }
}
}

</script>
