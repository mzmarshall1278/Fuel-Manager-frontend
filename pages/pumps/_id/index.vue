<template>
    <div class="container">
        <pageTitle :pageTitle="`Pump : ${pump.number} ${pump.oil}`"></pageTitle>
    <v-card class="pa-10">
        <ErrorTip :text="err" v-if="err  && err != 'Something went wrong when fetching your litre'" />
        <OverLay :loading="loading" />
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="makeSale"
            >
            <p class="grey--text title"> Please Enter Zero "0" for a pump that is not functioning</p>
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
                class="mr-4 white--text"
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
    middleware:[
    'checkAuth',
    'Auth'
    ],
    data(){
        return {
            startedA :'', finishedA:'', startedB:'', finishedB:'', session: 'started', valid : true, error:"", date: ""
        }
    },
    computed:{
        id(){
            return this.$route.params.id
        },
         branchId(){
           return this.$route.query.branchId
        },
        pump(){
            return this.$store.getters.getSinglePump(this.id)
        },
        litreAt (){
            return this.$store.getters.litreAt(this.pump.oil)
        },
        err(){  
            return this.$store.getters.error
        },
        loading(){
            return this.$store.getters.loading
        },
        user(){
            return this.$store.state.user
        }
        
    },
    watch:{
        err(val){
            if(val === 'Something went wrong when fetching your litre'){
                this.$router.push('/stats/newLitre?branchId='+this.branchId)
         }
        }
    },
    mounted(){
        return this.$store.dispatch('getLitreInfo',this. branchId );
        
    },
    methods :{
        makeSale(){
            if(!this.startedA && !this.startedB && !this.finishedA && !this.finishedB){
                this.error = "Please Fill all inputs. Enter '0' for a pump that is not functioning"
                return
            }
            this.error = "";
           
            
            //vuex
            
            
            if(this.startedA || this.startedB){
                return this.$store.dispatch('addSale', {startedA :this.startedA , startedB: this.startedB, oil : this.pump.oil, pumpId : this.pump._id, litreAt : this.litreAt, date : this.date, branchId: this.branchId, state: this.user.state, stationId : this.user.stationId}).then(res =>{
                this.startedA ="";
                this.startedB ="";
                this.finisheddA ="";
                this.finishedB ="";
                this.date = ""
               if(!this.err) this.$router.push('/pumps?branchId='+this.branchId);
            }).catch(err => console.log(err))
            }else{
                return this.$store.dispatch('updateSale',{ finishedA :this.finishedA , finishedB: this.finishedB, oil : this.pump.oil, pumpId : this.pump._id, litreAt : this.litreAt, date : this.date, branchId: this.branchId, state: this.user.state, stationId : this.user.stationId}).then(res =>{
                this.startedA ="";
                this.startedB ="";
                this.finisheddA ="";
                this.finishedB ="";
                this.date = ""
                if(!this.err)this.$router.push('/pumps?branchId='+this.branchId);
            }).catch(err => console.log(err))
            }

            
        }
    }
}
</script>