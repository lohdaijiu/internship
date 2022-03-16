
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
            pos: "",
            photoURL: "https://firebasestorage.googleapis.com/v0/b/internship-433c3.appspot.com/o/profile%2Fblank-pic.jpg?alt=media&token=730520eb-c8c6-4345-83d5-807015471610",
            profileData: [{"About" : ""}, {"Work Experience" : ""}, {"Skills and Competencies" : ""}, {"Career Interests" : ""}, {"Projects" : ""}]
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
                Email: this.email, 
                Major: this.major, 
                Name: this.name, 
                PlaceOfStudy: this.pos, 
                photoURL: this.photoURL, 
                ProfileData: this.profileData, 
                Employer: false
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