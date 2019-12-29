<template>
<v-flex xs12 sm10 md8 class="ml-3">
                <v-card class="pa-2">
                <v-card-title class="marshall white--text">{{data._id}}</v-card-title>
                <v-card-text class="mt-2 marshall--text">
                    <p>Total Pumps accounted for : {{data.pumps}}</p>
                    <p>Total Liters Sold  : {{data.sold}} litres</p>
                    <p>Total Ammount  : {{data.totalAmmount}} NGN</p>
                </v-card-text>

                <v-card-actions>
                <v-btn class="marshall white--text" @click="loadThis">
                    View Full sale
                </v-btn>
            </v-card-actions>
            </v-card>
            </v-flex>
</template>
<script>
export default {
    props:['data', 'branch'],
  data(){
    return {
      
    }
  },
  methods:{
      loadThis(){
          this.$router.push('/transactions/'+this.data._id+"?branchId="+this.branch)
      }
  }
}
</script>
