<template>
    <div class="container">
        <pageTitle :pageTitle="`Pump : ${pump.number} ${pump.oil}`"></pageTitle>
    <v-card class="pa-10">
        
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="makeSale"
            >

            <v-radio-group v-model="session" :mandatory="true">
                <p class="marshall--text">Session</p>
                <p style="color:red" v-if="error">{{error}}</p>
            <v-radio label="Morning" value="started"></v-radio>
            <v-radio label="Night" value="finished"></v-radio>
            </v-radio-group>

            <div class="" v-if="session === 'started'">
                <div class="title marshall--text">Morning Reading</div>
                    <v-text-field
                    v-model="startedA"
                    type="number"
                    label="Reading for Head A"
                    required
                    ></v-text-field>

                    <v-text-field
                    v-model="startedB"
                    type="number"
                    label="Reading for Head B"
                    required
                    ></v-text-field>
            </div> 
               
            <div class=""  v-if="session === 'finished'">
                <div class="title marshall--text">Night Reading</div>
                 <v-text-field
                v-model="finishedA"
                type="number"
                label="Reading for Head A"
                required
                ></v-text-field>

                <v-text-field
                v-model="finishedB"
                type="number"
                label="Reading for Head B"
                required
                ></v-text-field>

            </div>
               <v-text-field
                    v-model="date"
                    type="date"
                    label="Date"
                    required
                    ></v-text-field>
                <v-btn
                :disabled="!valid"
                color="marshall"
                class="mr-4"
                type="submit"
                >
                submit
                </v-btn>
            </v-form>
    </v-card>
        
    </div>
</template>
<script>
export default {
    data(){
        return {
            startedA :'', finishedA:'', startedB:'', finishedB:'', session: 'started', valid : true, error:"", date: ""
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
            return this.$store.getters.litreAt(this.pump.oil)
        }
    },
    methods :{
        makeSale(){
            if(!this.startedA && !this.startedB && !this.finishedA && !this.finishedB){
                this.error = "sorry! you must enter at least One reading"
                return
            }
            this.error = "";
            // const sale = {
            //     startedA: this.startedA,
            //     startedB : this.startedB,
            //     finishedA : this.finishedA,
            //     finishedB : this.finishedB,
            //     oil : this.pump.oil,
            //     pumpId: this.pump._id,
            //     branchId : this.user.branchId,
            //     litreAt : this.litreAt,
            //     date : this.date
            // }
            
            //vuex
            
            
            if(this.startedA || this.startedB){
                return this.$store.dispatch('addSale', {startedA :this.startedA , startedB: this.startedB, oil : this.pump.oil, pumpId : this.pump._id, branchId : this.user.branchId, litreAt : this.litreAt, date : this.date}).then(res =>{
                this.startedA ="";
                this.startedB ="";
                this.finisheddA ="";
                this.finishedB ="";
                this.date = ""
                this.$router.push('/pumps')
            })
            }else{
                return this.$store.dispatch('updateSale',{ finishedA :this.finishedA , finishedB: this.finishedB, oil : this.pump.oil, pumpId : this.pump._id, branchId : this.user.branchId, litreAt : this.litreAt, date : this.date}).then(res =>{
                this.startedA ="";
                this.startedB ="";
                this.finisheddA ="";
                this.finishedB ="";
                this.date = ""
                this.$router.push('/pumps')
            })
            }

            
        }
    }
}
</script>