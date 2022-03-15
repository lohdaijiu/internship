!<template>
  Full name 
  <p><input type="text"  v-model="name"/></p>
    Place of Study
  <p><input type="text" placeholder="" v-model="pos"/></p>
    Major
    <p><input type="text" placeholder="Email" v-model="major"/></p>
    <p><button @click="updateP">Submit</button></p>
    <p><button @click="check">check</button></p>
</template>

<script>
import {getAuth, updateProfile} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"; 

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
        updateP() {
            const auth = getAuth();
            updateProfile(auth.currentUser, {
              Name: this.name,
              Major: this.major,
              PlaceOfStudy: this.pos,
              Employer: false,
            }).then(() => {console.log("success")})
        },
        check() {
            // const auth = getAuth();
            // const user = auth.currentUser;

            // if (user !== null) {
            // user.providerData.forEach((profile) => {
            //     console.log(profile.Name);
            //     console.log(profile.uid);
            //     console.log(profile.Major);
            //     console.log(profile.PlaceOfStudy);
            //     console.log(profile.empty);
            // });
            // }
            

// Add a new document in collection "cities"
    setDoc(doc(db, "cities", "LA"), {
  name: "Los Angeles",
  state: "CA",
  country: "USA"
});

        }
    }
}
</script>

<style>

</style>