!<template>
  Student Login

  

  <div>
      <router-link to="/studentregister"> Create an account here </router-link>
  </div> <br><br>

  <p><input type="email" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button @click="login">Submit</button></p>

</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
      return {
            email: "",
            password: "",
            error: ""
        };
  },


  methods: {
    login() {
      signInWithEmailAndPassword(getAuth(), this.email, this.password)
      .then(console.log("Login Success"))
  }, 
  }
}
</script>

<style>

</style>