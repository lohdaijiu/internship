<template>
  <StudentNav />
    <h2>Job Application</h2>

    <div id = 'mainContainer'>

        <div id = 'contentContainer'>
                <!-- Cards -->
              <el-card class="box-card">
                    <div id="company_name">
                        {{company_name}} Company Name
                    </div>
                    <br>
                    <div id="jobpos">
                        {{jobpos}} Job Position
                    </div>
                    <br>

                    <div id="range">
                        {{range}} Date Range
                    </div>
              </el-card>

            <div id = 'subContainer'> 
                <h3>Short Writeup</h3>
               
                  <el-input class="writeup"
                    v-model="textarea"
                    maxlength="500"
                    placeholder="Please enter here"
                    show-word-limit
                    type="textarea"
                    :rows="10"

                  />
                <!-- <textarea type="text" placeholder="Please enter here"> </textarea> -->
                
            </div>
        </div>
        
    </div>
    <div id = 'buttonContainer'>
        <router-link to="/applicationdashboard"> <button id ='applyButton' @click="apply" >Apply</button></router-link>
        <router-link to="/viewjoblisting"> <button id ='cancelButton' >Cancel</button></router-link>
    </div>

</template>

<script>
import StudentNav from "../../components/StudentNav.vue";
import {
  setDoc,
  getDoc,
  getFirestore,
  updateDoc,
  arrayUnion,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import firebaseApp from "../../main.js";
import { getAuth } from "firebase/auth";
import { ref } from 'vue'
const text = ref('')
const textarea = ref('')

export default {

    name: "StudentApplyJob",


    components: {
        StudentNav,
    },
    data() {
        return {
            company_name: "",
            jobpos: "",
            range: "",
            writeup: "",
            textarea,
            text

        }
    },

    async created() {
            const db = getFirestore(firebaseApp);
            const auth = getAuth();
            const uid = auth.currentUser.uid;
            const docRef = doc(db, "User", "" + uid);
            const docSnap = await getDoc(docRef);
            console.log(docSnap.data())
    },

    methods: {
        async apply(x) {
            console.log(x);
            const db = getFirestore(firebaseApp);
            const id = getAuth().currentUser.uid;
            const applicationName = x.companyname.concat(" - ", x.jobpos, " - ", id);
            const jobName = x.companyname.concat(" - ", x.jobpos);
            const docRef = doc(db, "Application", applicationName);
            const docSnap = await getDoc(docRef);
            const docRef1 = doc(db, "Job", jobName);
            const docRef2 = doc(db, "User", id);

            if (docSnap.exists()) {
                alert("You have already applied for this position");
            } else {
                try {
                //Add document into application db

                const data = {
                    CreatedAt: serverTimestamp(),
                    Progress: "Pending",
                    Applicant: id,
                    Position: x.jobpos,
                    Status: "",
                    CompanyName: x.companyname,
                };

                await setDoc(docRef, data);
                await updateDoc(docRef1, { Applicants: arrayUnion(id) });
                await updateDoc(docRef2, {
                    JobsApplied: arrayUnion(applicationName),
                });
                alert("Job applied!");
                } catch (error) {
                alert("There was an error processing the application");
                console.log(error);
                }
            }
        },

  
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');

h2 {
    font-family: "Poppins";
    text-align: center;
}
h3 {
    font-family: "Poppins";
    text-align: left;
}

.box-card {
  width: 80%;
  height: 150px;
  font-family: "Poppins";
}

#buttonContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-left: 73.5%;
    max-width: 15%;
    padding-right: 3%;
    min-height: 200px;
}

span:hover {
    background-color:#ccc;
    
}

span {
    border-radius: 15px;
    min-width: 0.5%;
    text-align: center;
}

#applyButton {
    border-radius: 10px;
    
    padding-left: 50%;
    padding-right: 50%;
    padding-top: 24%;
    padding-bottom: 24%;
    text-align: center;

    font-weight: bold;
    background-color: #D4D381;
    border-style: solid;
    border-color: #96C67F;
}

#cancelButton {
    border-radius: 10px;
    margin-left: 30%;
    
    padding-left: 40%;
    padding-right: 40%;
    padding-top: 20%;
    padding-bottom: 20%;
    text-align: center;
    font-weight: bold;
    background-color: #D4D381;
    border-style: solid;
    border-color: #96C67F;
}
#applyButton:hover {
    background-color: #50e655;

}
#applyButton:active {
    transform: translateY(1px);
}

#cancelButton:hover {
    background-color: #50e655;

}
#cancelButton:active {
    transform: translateY(1px);
}
input {
    border: #ccc;
    background-color: #f8f8f8;
    box-sizing:border-box;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    color: #1f1d2a;
    font-size: 16px;    
    border-radius: 15px;
    max-width: 30%;
}

/* .writeup {
    width: 100%;
    height: 150px;
    padding: 12px 20px;
    box-sizing:border-box;
    border: 2px solid #ccc;
    border-radius: 10px;
    background-color: #f8f8f8;
    font-family: "Poppins", sans-serif;
    font-weight: 300;
    color: #1f1d2a;
    font-size: 16px;
    resize: none;
} */

#contentContainer {
    display:flex;
    justify-content:space-evenly;
    align-items: center;
    flex-direction: column;
    width: 80%;
    text-align: left;
    overflow: auto;
    resize: none;
    min-height: 500px;
    
}
#mainContainer {
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    flex-direction: row;
    width: 80%;
    margin-top: 5%;
    margin-bottom: 1%;
    margin-left: 9.5%;
    margin-right: 5%;
    padding-bottom: 4%;
    min-height:500px;
    border-radius: 30px;
    background-color: white;
}
span {
    margin-left: 97%;
}


#subContainer {
    display:flex;
    justify-content: center;
    align-items: left;
    flex-direction: column;
    margin-top: 2%;
    margin-left: 4%;
    margin-right: 4%;
    margin-bottom: 1%;
    text-align: left;
    width: 90%;
    resize: none;    
    overflow: auto;
    min-height: 100px; 
}

</style>