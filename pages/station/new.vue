<template>
    <div class="container">
        <PageTitle pageTitle="Create Station"></PageTitle>
 <v-card class="mx-auto pa-10">
            <v-form
            v-model="valid"
            lazy-validation
            @submit.prevent="submit"
            >
                <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Full Name"
                required
                ></v-text-field>

                <v-text-field
                v-model="stationName"
                :rules="nameRules"
                label="Full Name"
                required
                ></v-text-field>

                <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
                ></v-text-field>

                <v-text-field
                v-model="number"
                type="number"
                :rules="numberRules"
                label="Phone Number"
                required
                ></v-text-field>

                <v-text-field
                v-model="password"
                type="password"
                :rules="passwordRules"
                label="password"
                required
                ></v-text-field>


                <!-- <v-select
                v-model="select"
                :items="items"
                :rules="[v => !!v || 'Item is required']"
                label="Item"
                required
                ></v-select> -->

                <!-- <v-checkbox
                v-model="checkbox"
                :rules="[v => !!v || 'You must agree to continue!']"
                label="Do you agree?"
                required
                ></v-checkbox> -->

                <v-btn
                :disabled="!valid"
                color="marshall white--text"
                class="mr-4"
                type="submit"
                >
                Login
                </v-btn>
                
                <!-- <v-btn
                color="error"
                class="mr-4"
                @click="reset"
                >
                Reset Form
                </v-btn>

                <v-btn
                color="warning"
                @click="resetValidation"
                >
                Reset Validation
                </v-btn> -->
            </v-form>
        </v-card>

    </div>
</template>
