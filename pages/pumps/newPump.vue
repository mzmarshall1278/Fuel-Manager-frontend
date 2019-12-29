<template>
    <div class="container">
        <PageTitle pageTitle="Add New Pump"></PageTitle>
    <OverLay :loading="loading"/>
        <v-card class="pa-10 mt-3">
            <ErrorTip  @dismissed="onDismissed" :text="err" v-if="err"/>
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
    middleware:[
    'checkAuth',
    'Auth'
    ],
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
         branchId(){
           return this.$route.query.branchId
        },
        pumps(){
            return this.$store.getters.getPumps;
        },
        loading(){
            return this.$store.getters.loading
        },
        err(){
            return this.$store.getters.error
        }
    },

    methods :  {
        onDismissed(){
        return this.$store.commit('clearError')
        console.log('done')
      },
        addPump(){

            const pump = {
                number: this.pumps.length + 1,
                oil : this.type,
                branchId : this.branchId
            }
            if(!this.oil){
                this.error = "You must specify the oil type"
                return
            }
            return this.$store.dispatch('addPump', pump).then((res, err) => {
                if(!this.err) this.$router.push('/pumps')
               this.error = ""
            } ).catch(err => {

            })
            
        }
    },
}
</script>

