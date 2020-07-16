<template>
    <div class="container">
        <PageTitle pageTitle="Add New Branch"></PageTitle>
        <v-card class="pa-10">
            <v-form @submit.prevent="addBranch" ref="form">
                <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Branch Name"
                required
                ></v-text-field>

                <v-text-field
                v-model="address"
                :rules="addressRules"
                label="Address"
                required
                ></v-text-field>

                

                <v-select
                v-model="state"
                :items="items"
                :rules="[v => !!v || 'state is required']"
                label="State"
                required
                ></v-select>
                <v-btn
                :disabled="!valid"
                color="marshall white--text"
                class="mr-4"
                type="submit"
                >
                submit
                </v-btn>
            </v-form>
        </v-card>

    </div>
</template>
<script>
export default {    
    data(){
        return {
            valid: true,
            name : "", nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length >= 5) || 'Full Name must be More than 5 characters',
            ], manager : "", address : "", addressRules: [
                v => !!v || 'address is required',
                v => (v && v.length >= 5) || 'address must be More than 10 characters',
            ], state : "",items: [
                'Abia' ,'Adamawa','Akwa Ibom','	Anambra', '	Bauchi', '	Bayelsa', '	Benue', '	Borno', '	Cross Rive', 'Delta', '	Ebonyi','Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo',, 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nassarawa', 'Niger', 'Ogun', 'Ondo',, 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
                
            ],
        }
    },
    computed :{
       stationId(){
           return this.$rout.query.stationId
       }
    },
    methods :{
        addBranch(){
            const branch = {
                name : this.name,
                address : this.address,
                state : this.state,
                station : this.stationId
            };
            //vuex
            this.$store.dispatch('addBranch', branch).then(() =>{
                this.$router.push('/branches')
            })

        }
    }
}
</script>
