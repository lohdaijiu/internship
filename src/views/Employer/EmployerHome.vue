!<template>
  EHOME
</template>

<script>
import { getAuth } from "firebase/auth";


export default {
    

    mounted() {
        const auth = getAuth();
        console.log(auth.currentUser.email)
    }
}
</script>

<style>

</style>