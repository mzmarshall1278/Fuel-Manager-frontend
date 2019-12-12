<template>
    <div class="container">
        <PageTitle pageTitle="Add New Pump"></PageTitle>

        <v-card class="pa-10 mt-3">
            <p style="color : red" v-if="error"></p>
            <v-card-text>
                        <v-select
                            :items="oil"
                            label="Select pump type"
                            item-value="text"
                            v-model="type"
                            ></v-select>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                            color="marshall"
                            text
                            @click="addPump"
                            >
                            add
                            </v-btn>
                        </v-card-actions>
                        
        </v-card>
    </div>
</template>
<script>
export default {
    data(){
        return {
            type : '',
            error:"",
            oil: [
                    { text: 'petrol' },
                    { text: 'diesel' },
                    { text: 'kerosine' },
                ],
        }
    },
    computed: {
        branch(){
            return this.$store.state.user.branchId
        },
        pumps(){
            return this.$store.getters.getPumps;
        },
    },

    methods :  {
        addPump(){

            const pump = {
                number: this.pumps.length + 1,
                oil : this.type,
                branch: this.branch
            }
            if(!this.oil){
                this.error = "You must specify the oil type"
                return
            }
            return this.$store.dispatch('addPump', pump).then(() => {
                this.$router.push('/pumps')
               this.error = ""
            } )
            
        }
    },
}
</script>

