<template>
    <div class="container">
        <PageTitle pageTitle = "Deliveries" class="my-3"></PageTitle>
        <v-card class="pa-10">
            <v-form @submit.prevent="submit" ref="form">
                <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Driver Name"
                required
                ></v-text-field>

                <v-text-field
                v-model="ammount"
                type="number"
                label=" Ammount (ltr)"
                required
                ></v-text-field>

                <v-text-field
                v-model="price"
                type="number"
                label="Price per litre"
                required
                ></v-text-field>

                <v-select
                v-model="oil"
                :items="items"
                :rules="[v => !!v || 'Oil is required']"
                label="oil"
                required
                ></v-select>
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
            valid: true,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length >= 5) || 'Full Name must be More than 5 characters',
            ],
            
            ammount : '', price:'',
            oil: null,
            items: [
                'petrol',
                'desiel',
                'kerosine',
            ],
        }
    },
    methods : {
        submit(){

            const cred = {
              name: this.name,
              ammount : this.ammount,
              price : this.price,
              oil : this.oil
          }
          console.log(cred);
          this.$refs.form.reset()
        }
    }
}
</script>
