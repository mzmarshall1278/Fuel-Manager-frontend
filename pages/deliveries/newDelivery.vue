<template>
    <div class="container">
        <PageTitle pageTitle = "New Delivery" class="my-3"></PageTitle>
        <ErrorTip :text="err" v-if="err" />
        <OverLay :loading="loading" />
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
                :rules="ammountRules"
                label=" Ammount (ltr)"
                required
                ></v-text-field>

                <v-text-field
                v-model="price"
                :rules="priceRules"
                type="number"
                label="Price per litre"
                required
                ></v-text-field>

                <v-text-field
                v-model="date"
                :rules="dateRules"
                type="date"
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
                color="marshall white--text"
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
            ammountRules: [
                v => !!v || 'Ammount is required',
                v => (v && v.length >= 1) || 'Ammount must be greater than 1',
            ],
            priceRules: [
                v => !!v || 'price is required',
                v => (v && v.length >= 1) || 'Price must be greater than 1',
            ],
            oil: null,
            date :'',
            dateRules:[
                v => !!v || 'Date is required'
            ],
            items: [
                'petrol',   
                'desiel',
                'kerosine',
            ],
        }
    },
    computed : {
        branchId(){
            return this.$route.query.branchId;
        },
        err(){
            return this.$store.getters.error
        },
        loading(){
            return this.$store.getters.loading
        }
    },
    methods : {
        submit(){

            const cred = {
              name: this.name,
              ammount : this.ammount,
              litreAt : this.price,
              oil : this.oil,
              date : this.date,
              branchId : this.branchId
          }
          //console.log(cred);

          return this.$store.dispatch('addDelivery', cred).then(() => {
              if(!this.err) this.$router.push('/deliveries')
              this.$refs.form.reset()
          }).catch(err => console.log(err))
          
        }
    }
}
</script>
