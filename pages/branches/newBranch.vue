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
                'Abia',
                'Adamawa',
                'Akwa-ibom',
                'Aauchi',
                'Bayelsa',
                'Cross-river',
                'Delta',
                'Ekiti',
                'Kano',
                'Kaduna', 
                'Abuja', 
                'Lagos',
                'Zamfara',
                'Sokoto',
                'Kebbi',
                'Nassarawa',
                'Jos',
                'Jigawa',
                'Katsina'   
            ],
        }
    },
    methods :{
        addBranch(){
            const branch = {
                name : this.name,
                address : this.address,
                state : this.state,
            };
            //vuex
            this.$store.dispatch('addBranch', branch).then(() =>{
                this.$router.push('/branches')
            })

        }
    }
}
</script>
