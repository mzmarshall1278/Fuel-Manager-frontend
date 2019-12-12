<template>
    <v-flex xs12> 
      <v-card
    class="mx-auto my-2"
    max-width="600px"
  >
    <v-card-title  class="display-1 marshall--text">
      Litre Prices
    </v-card-title>
          
      <v-card-text>
      <div class="text--primary">
        <p>Petrol : {{litre.petrol}} ltr</p>
        <p>diesel : {{litre.diesel}} ltr</p>
        <p>Kerosine : {{litre.kerosine}} ltr</p>
      </div>
    </v-card-text>
    <v-card class="container" v-if="show">
      <v-form @submit.prevent="changeLitre">
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
      <v-btn class="marshall white--text mx-5  my-2" @click="changeLitre">change</v-btn>
    </div>
      </v-form>
    </v-card>
    <div>
      <v-btn class="marshall white--text mx-5  my-2" v-if="!show" @click="show = !show">change litre</v-btn>
    </div>
  </v-card>      
    </v-flex>
  
</template>
<script>
export default {
  data(){
    return {
      show : false,
      diesel: "", petrol : "", kerosine : ""
    }
  },
  computed:{
    branch(){
      return this.$store.state.user.branchId
    },
    litre(){
      return this.$store.state.litre
    }
  },
  methods : {
    changeLitre(){
      const data = {
        branchId: this.branch,
        petrol : this.petrol ? this.petrol: this.litre.petrol,
        diesel : this.diesel ? this.diesel: this.litre.diesel,
        kerosine : this.kerosine ? this.kerosine: this.litre.kerosine,
      }
      // reach out to the store
      return this.$store.dispatch('updateLitre', data).then( ()=> {
        this.petrol = "";
        this.diesel = "";
        this.kerosine = "";
        this.show = false;
      })
    }
  },
  
  mounted(){
      return this.$store.dispatch('getLitreInfo', this.branch) 
  }
}
</script>
