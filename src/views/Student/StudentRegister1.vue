
<template>
  <h1>Create an Account for Students</h1>
  Full name 
  <p><input type="text"  v-model="name"/></p>
    Place of Study
  <p><input type="text" placeholder="" v-model="pos"/></p>
    Major
    <p><input type="text" placeholder="Email" v-model="major"/></p>
    Email Address
  <p><input type="email" placeholder="Email" v-model="email"/></p>
  Password
  <p><input type="password" placeholder="Password" v-model="password"/></p>
  Confirm Password
    <p><input type="password" placeholder="Password" v-model="password1"  /></p>
  <p><button @click="register">Submit</button></p>
</template>

<script>
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth"



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

            if (this.email == "" || this.password == "" || this.password1 == "" || this.major == "" || this.name == "" || this.pos == "") {
              alert("Please fill in all the blanks");
              return;
            }

            const auth = getAuth();
            
            createUserWithEmailAndPassword(auth, this.email, this.password)
            .then()
            .catch((error) => {alert(error.message)} )
            .then((userCred) => {
            updateProfile(userCred.user, {
              Name: this.name,
              Major: this.major,
              PlaceOfStudy: this.pos,
              Employer: false,
            })}).then(()=>{console.log("success")})
        },
    }
}

</script>