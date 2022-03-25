
<template>
  <h1>Create an Account for Employer</h1>
  Company name
  <p><input type="text"  v-model="companyName"/></p>
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
            companyName: "",
            photoURL: "https://firebasestorage.googleapis.com/v0/b/internship-433c3.appspot.com/o/profile%2Fblank-pic.jpg?alt=media&token=730520eb-c8c6-4345-83d5-807015471610",
            companyProfileData: [
              {"About your company" : ''},
              {'Company Culture': ''},
              {'Company Vision' : ''},
            ],
        };
    },
    methods: {
        async register() {
            if (this.password != this.password1) {
              alert("Password is different")
              return;
            } 

            if (this.companyName == "" || this.password == "" || this.password1 == "" || this.email == "") {
              alert("Please fill in all the blanks");
              return;
            }

            const auth = getAuth();
            const db = getFirestore(firebaseApp);
            let status = true;

            
            await createUserWithEmailAndPassword(auth, this.email, this.password)
            .catch((error) => {alert(error.message); status = false} )
            console.log(status)
            if (status) {
            const uid = auth.currentUser.uid;
            try {
              const docRef = setDoc(doc(db, "User", uid), {
                Email: this.email, CompanyName: this.companyName, photoURL: this.photoURL,
            companyProfileData: this.companyProfileData, Employer: true, Jobs: []
            })
            console.log(docRef)
            this.$router.push("/employerlogin");
            } catch (error) {
              console.error(error);
            }
            } 


            
           


            

            
        },
    }
}

</script>