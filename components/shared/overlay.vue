<template>
  <div class="text-center">
   

    <v-overlay :value="overlay" color="marshall">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
  export default {
      props: ['loading'],
    computed:{
        overlay(){
            return this.loading
        }
    }
  }
</script>