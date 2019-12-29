<template>
    <div class="container">
      <v-layout row v-if="error">
        <v-flex xs12 sm6 offset-sm3 > 
          <ErrorTip @dissmissed="onDismissed" :text="error"></ErrorTip>
        </v-flex>
      </v-layout>
      <OverLay :loading="loading"/>
        <pageTitle pageTitle ="Login"></pageTitle>
        <v-card class="mx-auto pa-10">
            <v-form
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

                <v-text-field
                v-model="password"
                type="password"
                :rules="passwordRules"
                label="password"
                required
                ></v-text-field>

                <v-btn
                :disabled="!valid "
                color="marshall white--text"
                class="mr-4"
                type="submit"
                
                >
                Login
                </v-btn>
                <nuxt-link to="/auth/signup" class="marshall--text"> Don't have an account? </nuxt-link>
         
            </v-form>
        </v-card>
    </div>
  
</template>

<script>
  export default {
    data: () => ({
      valid: true,
    
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
   
    }),
    
  computed: {
    token(){
      return this.$store.state.token
    },
    error(){
      return this.$store.getters.error
    },
    loading(){
      return this.$store.getters.loading
    } 
  },
    methods: {
      onDismissed(){
        return this.$store.commit('clearError')
        console.log('done')
      },
      submit () {
       
          this.snackbar = true

          const cred = {
              email: this.email,
              password : this.password,
          }
          return this.$store.dispatch('login', cred).then(()=>{
            this.$router.push('/');
          })
          
        
      },
   
    }
  }
</script>
