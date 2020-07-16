<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      class="marshall"
      dark
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      dark
      class="marshall"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
     
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
    <!-- <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
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
      // items: [
      //   {icon: 'mdi-home',  title: 'home', to: '/'},
      //   {icon: 'mdi-kodi', title: 'branches', to: '/branches' },
      //   {icon: 'mdi-gas-station',title: 'Pumps', to: '/pumps' },
      //   {icon: 'mdi-tanker-truck', title: 'deliveries', to: '/deliveries'},
      //   {icon: 'mdi-pencil-box', title: 'transactions', to: '/transactions'},
      //   {icon: 'mdi-water', title: 'stats', to: '/stats'},
      //   {icon: 'mdi-account',title: 'profile', to: '/profile' },
      // ],
      miniVariant: false,
      title: 'Fuel Manager'
    }
  },
  computed: {
    user(){
      return this.$store.getters.user
    },
    items(){
      let items = [
        {icon: 'mdi-home',  title: 'home', to: '/'},
        {icon: 'mdi-home',  title: 'login', to: '/auth/login'},
      ];
      if(this.user.userType === 'owner'){
          items = [
            {icon: 'mdi-home',  title: 'home', to: '/'},
            {icon: 'mdi-kodi', title: 'branches', to: '/branches' },
            {icon: 'mdi-tanker-truck', title: 'deliveries', to: '/deliveries'},
            {icon: 'mdi-pencil-box', title: 'transactions', to: '/transactions'},
            {icon: 'mdi-water', title: 'stats', to: '/stats'},
            {icon: 'mdi-account',title: 'profile', to: '/profile' },
          ]
        }else if(this.user.userType === 'stateManager') {
          items = [
            {icon: 'mdi-home',  title: 'home', to: '/'},
            {icon: 'mdi-kodi', title: 'branches', to: `/branches/states/${this.user.state}?stationId=${this.user.stationId}` },
            {icon: 'mdi-tanker-truck', title: 'deliveries', to: `/deliveries/states/${this.user.state}?stationId=${this.user.stationId}`},
            {icon: 'mdi-pencil-box', title: 'transactions', to: `/transactions/states/${this.user.state}?stationId=${this.user.stationId}`},
            //{icon: 'mdi-water', title: 'stats', to: '/stats'},
            {icon: 'mdi-account',title: 'profile', to: '/profile' },
          ]
        }else if(this.user.userType === 'branchManager'){
          items = [
            {icon: 'mdi-home',  title: 'home', to: '/'},
            {icon: 'mdi-gas-station',title: 'Pumps', to: `/pumps?branchId=${this.user.branchId}` },
            {icon: 'mdi-tanker-truck', title: 'deliveries', to: `/deliveries?branchId=${this.user.branchId}`},
            {icon: 'mdi-pencil-box', title: 'transactions', to: `/transactions?branchId=${this.user.branchId}`},
            {icon: 'mdi-water', title: 'stats', to: `/stats?branchId=${this.user.branchId}`},
            {icon: 'mdi-account',title: 'profile', to:  `/profile?branchId=${this.user.branchId}` },
          ]
        }else if(this.user.userType === 'new'){
          items = [
            {icon: 'mdi-home',  title: 'home', to: '/'},
            {icon: 'mdi-home',  title: 'create station', to: '/'},
            {icon: 'mdi-home',  title: 'authenticate', to: '/'},
          ]
        }
      return items
    }
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
