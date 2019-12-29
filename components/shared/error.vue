<template>
  <div>
    <v-alert
      dismissible
      color="red"
      border="left"
      elevation="2"
      colored-border
      @input="onClose"
      class="red--text"
    >
      <span >{{text}}</span>
    </v-alert>

  </div>
</template>
<script>
export default {
    props :['text'],
    data(){
        return {
            
        }
    },
    methods:{
        onClose(){
            this.$emit('dissmissed');
        }
    }
}
</script>
