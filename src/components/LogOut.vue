!<template>
    <p><button @click="logout">Logout</button></p>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";

export default {
    methods : {
        logout() {

            signOut(getAuth())
            .then(() => {console.log("SignOut Successful");
            this.$router.push('/')})
            .catch((error) => {alert(error.message)})
        }
    }
}
</script>

<style>

</style>

export default LogOutButton