<template>
    <div class="container">
        <pageTitle pageTitle ="Create Account" class="my-2"></pageTitle>
        <v-card class="mx-auto pa-10">
            <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="submit"
            >
               
                <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
                ></v-text-field>

                <!-- <v-text-field
                v-model="number"
                type="number"
                :rules="numberRules"
                label="Phone Number"
                required
                ></v-text-field> -->

                <v-text-field
                v-model="password"
                type="password"
                :rules="passwordRules"
                label="password"
                required
                ></v-text-field>


                <v-btn
                :disabled="!valid"
                color="marshall"
                class="mr-4 white--text"
                type="submit"
                >
                Sign Up
                </v-btn>
                <nuxt-link to="/auth/login" class="marshall--text"> Already have account? </nuxt-link>
                
            </v-form>
        </v-card>
    </div>
  
</template>
<script>
  export default {
    data: () => ({
      valid: true,
      // name: '',
      // nameRules: [
      //   v => !!v || 'Name is required',
      //   v => (v && v.length >= 5) || 'Full Name must be More than 5 characters',
      // ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password:'',
      passwordRules:[
        v => !!v || 'Password is required',
        v => (v && v.length >= 10 && v.length <= 32) || 'password must be between 10-32 characters',
      ],
      // number : '',
      // numberRules:[
      //   v => !!v || 'Number is required',
      //   v => (v && v.length >= 10) || 'Phone NUmber should be more than 10 characters',
      // ],
      // select: null,
      // items: [
      //   'Item 1',
      //   'Item 2',
      //   'Item 3',
      //   'Item 4',
      // ],
      // checkbox: false,
    }),

    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          this.snackbar = true

          const cred = {
              email: this.email,
              password : this.password,
          }
          
          return this.$store.dispatch('signup', cred ).then(()=>{
            this.$router.push('/auth/login')
            this.$refs.form.reset()
          })
          
        }
      },
    //   
    //   resetValidation () {
    //     this.$refs.form.resetValidation()
    //   },
    },
  }
</script>