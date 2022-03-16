!<template>
  Employer Login
  
  <div>
      <router-link to="/employerregister"> Create an account here </router-link>
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
    async login() {
      try {
      await signInWithEmailAndPassword(getAuth(), this.email, this.password)
      .then(this.$router.push('/employerhome'))
      .catch((error) => {alert(error.message)})
      } catch {
        (error) => {alert(error.message)}
      }
  }
  }
}
</script>

<style>

</style>