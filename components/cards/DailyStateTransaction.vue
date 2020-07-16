<template>
<v-flex xs12 sm10 md8 class="ml-3">
                <v-card class="pa-2">
                <v-card-title class="marshall white--text">Date : {{data._id.date}}</v-card-title>
                <v-card-text class="mt-2 marshall--text">
                    <!-- <p>Total Stations accounted for : {{data.branches}}</p> -->
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
    props:['data', 'stationId'],
  data(){
    return {
      
    }
  },
  methods:{
      loadThis(){
          this.$router.push('/transactions/states/details/'+this.data._id.date+"?stationId="+this.stationId+"&state="+this.data._id.state)
      }
  }
}
</script>
