<template>
    <div class="container">
        <pageTitle :pageTitle="`Branch : ${fullBranch.name} - ${fullBranch.state}`" class="mb-3"></pageTitle>

        <v-card class="py-4 px-10 marshall--text ml-5">
            <p>Branch Manager : {{fullBranch.manager}}</p>
            <p>Branch Name : {{fullBranch.name}}</p>
            <p>Branch Address : {{fullBranch.address}}</p>
            <p>Total Pumps : {{fullBranch.pumps}}</p>
            <p>Last liters sold : 1000 ltr</p>
            <p>Last Ammount recieved : NGN 143000</p>

        </v-card>
    </div>
</template>
<script>
export default {
    computed : {
        id(){
            return this.$route.params.id
        },
        fullBranch(){
            return this.$store.getters.getSingleBranch(this.id)
        }
    }
}
</script>

