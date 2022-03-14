<template>
    <p><button @click="back">Go Back</button></p>
  <h1>Create an Account for Employers</h1>
  <p><input type="email" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button @click="register">Submit</button></p>
</template>

<script>
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"

export default {
    data() {
        return {
            email: "",
            password: "",
            error: ""
        };
    },
    methods: {
        register() {
            createUserWithEmailAndPassword(getAuth(), this.email, this.password)
            .then(()=>{this.$router.push('/employerhome')})
        },
        back() {
            this.$router.push('/employerlogin')
        }
    }
}

</script>