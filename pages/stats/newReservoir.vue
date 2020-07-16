<template>
    <div class="container">
        <PageTitle pageTitle="Set Your Reservoir" />
    <ErrorTip :text="err" v-if="err && err != 'Reservoir not found'" />
        <OverLay :loading="loading" />
        <v-card class="container">
      <v-form @submit.prevent="setReservoir">
        <v-row class="mx-auto text-center">
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="Solo"
              placeholder="petrol"
              solo
              type="number"
              v-model="petrol"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="Solo"
              placeholder="diesel"
              solo
              type="number"
              v-model="diesel"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="Solo"
              placeholder="kerosine"
              type="number"
              solo
              v-model="kerosine"
            ></v-text-field>
          </v-col>
        </v-row>
        <div>
      <v-btn class="marshall white--text mx-5  my-2" @click="setReservoir">Set</v-btn>
    </div>
      </v-form>
    </v-card>
    </div>
</template>
<script>
export default {
    data(){
        return {
            petrol : "", kerosine : "", diesel : ""
        }
    },
    computed:{
        branchId(){
            return this.$route.query.branchId
        },
        err(){
            return this.$store.getters.error
        },
        loading(){
            return this.$store.getters.loading
        }
    },
    methods: {
        setReservoir(){
        const data = {
            branchId : this.branchId,
            petrol : this.petrol,
            kerosine : this.kerosine, 
            diesel : this.diesel    
        }
            return this.$store.dispatch('setReservoir', data).then( () => {
                if(!this.err){
                    this.$router.push('/deliveries?branchId='+this.branchId);
                }
            })
        }
    }
}
</script>
