<template>
  <v-app>
    
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      dark
      class="marshall"
    >
     
      <v-toolbar-title class="logo" v-text="title" />
      <v-spacer />
      <v-btn
      v-if="!user"
        icon
        @click.stop="login" class="mr-2"
      >
        <v-icon>mdi-account-key</v-icon> login
      </v-btn>
      <v-btn
      v-if="user"
        icon
        @click.stop="logout" class="mr-2"
      >
        <v-icon>mdi-account-key</v-icon> logout
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
   
    <v-footer
      :fixed="fixed"
      app
      class="marshall"
      dark
    >
      <span>&copy; Hooli Consults 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      title: 'Fuel Manager'
    }
  },
  computed: {
    user(){
      return this.$store.getters.user
    },
  },
   
  methods : {
    login(){
      this.$router.push('/auth/login');
    },
    logout(){
      this.$store.dispatch('logout');
      this.$router.push('/auth/login')
    }
  }
}
</script>
<style>
.logo{
  color :  #006064;
  text-shadow: 0 0 3px white,
               0 0 6px white,
               0 0 9px white,
               0 0 12px white,
               0 0 15px white,
               0 0 18px white,
               0 0 21px white;
  font-size: 1.5em;
  font-weight: bolder;  
  padding: 10px;  
         
}
</style>
