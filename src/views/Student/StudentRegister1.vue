
<template>
  <h1>Create an Account for Students</h1>
  Full name 
  <p><input type="text"  v-model="name" required/></p>
    Place of Study
    <p><input type="text" placeholder="" v-model="pos" required></p>
    Major
    <p><input type="text" placeholder="Email" v-model="major" required></p>
    Email Address
  <p><input type="email" placeholder="Email" v-model="email" required></p>
  Password
  <p><input type="password" placeholder="Password" v-model="password" required></p>
  Confirm Password
    <p><input type="password" placeholder="Password" v-model="password1" required></p>
  <p><button @click="register">Submit</button></p>
</template>

<script>
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"



export default {
    data() {
        return {
            email: "",
            password: "",
            password1: "",
            error: "",
            major: "",
            name: "",
            pos: ""
        };
    },
    methods: {
        register() {
            if (this.password != this.password1) {
              alert("Password is different")
              return;
            } 
            createUserWithEmailAndPassword(getAuth(), this.email, this.password)
            .then(()=>{this.$router.push('/studentlogin')})
            .catch((error) => {alert(error.message)} )
        },
    }
}

</script>