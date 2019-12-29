<template>
  <div class="container">
    <PageTitle pageTitle="Home"></PageTitle>
    <h1 class="marshall--text">This is Landing Page</h1>
    <v-card>
    </v-card>
  </div>
</template>
<script>
import card from "~/components/cards/LitreCard";
export default {

  components: {
    card
  },
  computed:{
    user(){
      return this.$store.getters.user
    }
  }
}
</script>

  