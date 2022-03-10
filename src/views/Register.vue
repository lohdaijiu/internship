<template>
  <h1>Create an Account</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button @click="register">Submit</button></p>
</template>

<script setup>
    import { ref } from 'vue'
    import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
    import { useRouter } from 'vue-router' // import router
    const auth = getAuth;
    const email = ref('')
    const password = ref('')
    const router = useRouter() // get a reference to our vue router
    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
    }
</script>