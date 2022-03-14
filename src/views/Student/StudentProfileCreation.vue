!<template>
  
</template>

<script>
import { getAuth, updateProfile } from "firebase/auth";
const auth = getAuth();

export default {
    methods : {
        proceed() {
            updateProfile(auth.currentUser, {
                displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"
                }).then(() => {

                }).catch((error) => {
                    alert(error)
                });
        }
    }
}
</script>
    
<style>

</style>