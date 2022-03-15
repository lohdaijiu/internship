!<template>
  EHOME
  <p><button @click="LogOut">Log Out</button></p>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";



export default {
    

    mounted() {
        const auth = getAuth();
        console.log(auth.currentUser.email);
        if (auth.currentUser == null) {
          alert("Please Login")
          this.$router.push('/')
        }
    },

    methods: {
      LogOut() {
        signOut(getAuth()).then(() => {this.$router.push('/')})
      }
    }
}
</script>

<style>

</style>