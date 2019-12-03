<template>
    <div class="container">
        <pageTitle :pageTitle="`Pump : ${id} ${pump.oil}`"></pageTitle>
    <v-card>
        <!-- <v-form @submit.prevent = "makeSale">
            <v-row class="mx-auto text-center">
                
            </v-row>
        </v-form> -->
        <v-btn @click="makeSale"></v-btn>
    </v-card>
    </div>
</template>
<script>
export default {
    data(){
        return {
            startedA :'', finishedA:'', startedB:'', finishedB:'',
        }
    },
    computed:{
        id(){
            return this.$route.params.id
        }, 
        user(){
            return this.$store.state.user
        },
        pump(){
            return this.$store.getters.getSinglePump(this.id)
        },
        litreAt (){
            return this.$store.getters.litreAt(this.pump.oil);
        }
    },
    methods :{
        makeSale(){
            const sale = {
                startedA: this.startedA,
                startedB : this.startedB,
                finishedA : this.finishedA,
                finishedB : this.finishedB,
                oil : this.pump.oil,
                pumpId: this.pump.id,
                branchId : this.user.branchId,
                litreAt : this.litreAt.price
            }
            //vuex
            console.log(sale)
        }
    }
}
</script>
