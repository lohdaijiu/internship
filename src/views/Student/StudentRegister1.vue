
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
  <p><button v-on:click="register()">Submit</button></p>
</template>

<script>
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"
import firebaseApp from '../../main.js'
import { getFirestore } from "firebase/firestore"
import {doc, setDoc } from "firebase/firestore"



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
        async register() {
            if (this.password != this.password1) {
              alert("Password is different")
              return;
            } 

            if (this.email == "" || this.password == "" || this.password1 == "" || this.major == "" || this.name == "" || this.pos == "") {
              alert("Please fill in all the blanks");
              return;
            }

            const auth = getAuth();
            const db = getFirestore(firebaseApp);
            
            createUserWithEmailAndPassword(auth, this.email, this.password)
            .then(() => {const uid = auth.currentUser.uid;
            try {
              const docRef = setDoc(doc(db, "User", uid), {
                Email: this.email, Major: this.major, Name: this.name, PlaceOfStudy: this.pos, Employer: false
            })
            console.log(docRef)
            } catch (error) {
              console.error(error);
            }})
            .catch((error) => {alert(error.message)} )


            

            this.$router.push("/studentlogin");
        },
    }
}

</script>