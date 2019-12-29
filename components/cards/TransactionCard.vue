<template>
            <v-flex xs12>
                <v-card class="mx-auto"  max-width="500">
                <v-card-title class="marshall white--text">
                  Pump : {{pump.number}}</v-card-title>
                <v-card-text class="marshall--text pt-2">
                    <p>HeadA Started with : {{transaction.startedA}} litres</p>
                    <p>HeadB Started with : {{transaction.startedB}} litres</p>
                    <p>HeadA Finished with : {{transaction.finishedA}} litres</p>
                    <p>HeadB Finished with : {{transaction.finishedB}} litres</p>
                    <p>total liters sold :{{(transaction.startedA-transaction.finishedA) + (transaction.startedB - transaction.finishedB)}} litres</p>
                    <p>total price : {{((transaction.startedA-transaction.finishedA) + (transaction.startedB - transaction.finishedB)) * transaction.litreAt}} NGN</p>
                    <p>litre at : {{transaction.litreAt}} NGN</p>
                    <p>Pump type : {{transaction.oil}}</p>
                </v-card-text>
                </v-card>
            </v-flex>
</template>
<script>
export default {
  props:['transaction'],
  data(){
    return {
      
    }
  },
  computed:{
    pump(){
      return this.$store.getters.getSinglePump(this.transaction.pumpId)
    }
  }
}
</script>
