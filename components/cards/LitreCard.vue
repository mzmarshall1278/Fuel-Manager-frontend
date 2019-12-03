<template>
  <v-card
    class="mx-auto my-2"
    max-width="600px"
  >
    <v-card-text>
      <p class="display-1 text--primary">
        Litre Prices
      </p>
      
      
      <div class="text--primary">
        <p>Petrol : 143 ltr</p>
        <p>Desiel : 189 ltr</p>
        <p>Kerosine : 199 ltr</p>
      </div>
    </v-card-text>
    <v-card class="container" v-if="show">
      <v-form @submit.prevent="changeLitre">
        <v-row class="mx-auto text-center">
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="Solo"
              placeholder="petrol"
              required
              :rules="[v => !!v || 'Petrol is required']"
              solo
              type="number"
              v-model="petrol"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="Solo"
              placeholder="desiel"
              solo
              required
              :rules="[v => !!v || 'Desiel is required']"
              type="number"
              v-model="desiel"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="Solo"
              placeholder="kerosine"
              required
              :rules="[v => !!v || 'kerosine is required']"
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
      <v-btn class="marshall white--text mx-5  my-2" @click="show = !show">change litre</v-btn>
    </div>
  </v-card>
</template>
<script>
export default {
  data(){
    return {
      show : false,
      desiel: "", petrol : "", kerosine : ""
    }
  },
  methods : {
    changeLitre(){
      const data = {
        petrol : this.petrol,
        desiel : this.desiel,
        kerosine : this.kerosine
      }
      // reach out to the store

      this.petrol = "";
      this.desiel = "";
      this.kerosine = "";
      this.show = false;
    }

  }
}
</script>
