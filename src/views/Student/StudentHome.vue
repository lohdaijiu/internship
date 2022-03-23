<template>
    <body>
        
        <div id ='welcome'>
                <h1>Welcome, {{name}}!</h1>
        </div>
        <div id ='analytics'>
                <h2>Analytics</h2>
        </div>
        

        <div class="statistics">
            <div class="numberOfRejections" data="studentData">
                <br>
                Number Of Rejections
                <br>
                <h4>{{studentData['numberOfRejections']}}</h4>
                
            </div>
            <div class="appInProgress">Application in progress</div>
            <div class="appComp">Applications Completed</div>
            <div class="jobType">Job Types of My Application</div>
            <div class="companyDistri">Company Distribution of My Application</div>
        </div>
        

    
    </body>
   
</template>
<script>
import firebaseApp from '../main.js'
import { getFirestore} from "firebase/firestore";
import { doc , getDoc} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const studentData = [
  {
    numberOfRejections: '3',
    appInProgress: '11',
    appComp: '14',
    jobType: {
        "Data Analyst": '65%',
        "Software Engineer": '35%'
    }, 
    companyDistri: {
        "Grab": '25%',
        "Shopee": '25%',
        "Facebook": '25%',
        "Google" : '25%'
    }
  }]

export default {
    data() {
            return { keyword: "", 
            studentData,
            name: ''};

    },
    async created() {
            const db = getFirestore(firebaseApp);
            const auth = getAuth()
            const uid = auth.currentUser.uid
            const docRef = doc(db, "User", "" + uid);
            const docSnap = await getDoc(docRef);
            let newData = docSnap.data().ProfileData
            this.about = newData.slice(0,1)[0]
            this.name = docSnap.data().Name
            this.profileData = newData.slice(1)
            this.image = docSnap.data().photoURL
            this.resumeURL = docSnap.data().resumeURL

    },

    methods: {
        goToEditProfile() {
                this.$router.push({ path: "/EditStudentProfile" });

        }
        
    } 
}  

</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap");
.analytics {
    text-align: right;
    justify-content: space-between;
    font-family: "Poppins", sans-serif;
    color: #1f1d2a;
    font-size: 16px;
}

.statistics {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 100px 100px;
    grid-gap: 30px;
    text-align: center;
    justify-content: space-between;
    font-family: "Poppins", sans-serif;
    color: #1f1d2a;
    font-size: 16px;
}

.numberOfRejections {
    grid-column: 1;
    grid-row: 1/2;
    background-color: rgba(102, 97, 97, 0.397);
}

.appInProgress {
    grid-column: 1;
    grid-row: 3/4;
}
.appComp {
    grid-column: 1;
    grid-row: 5/6;
}
.jobType {
    grid-column: 2/4;
    grid-row: 1/3;
}

.companyDistri {
    grid-column: 2/4;
    grid-row: 4/6;
}
</style>