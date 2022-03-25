<template>
    <body>
        <div id ='welcome'>
                <h1>Welcome, {{name}}!</h1>
        </div>
        <div id ='analytics'>
                <h2>Analytics</h2>
        </div>
    
        <div class="statistics" data="studentData">
            <div class="numberOfRejections">
                <br>
                Number Of Rejections
                <br>
                {{studentData.numberOfRejections}}
            </div>
            <div class="appInProgress">
                <br>
                Application in progress
                <br>
                {{studentData.appInProgress}}
            </div>
            <div class="appComp">
                <br>
                Applications Completed
                <br>
                {{studentData.appComp}}
            </div>
            <div class="jobType">
                Job Types of My Application
                <br>
                <StudentJobTypeChart></StudentJobTypeChart>
                </div>
            <div class="companyDistri">
                Company Distribution of My Application
                <br>
                <StudentCompDistributionChart></StudentCompDistributionChart>
            </div>
        </div>
    </body>
   
</template>
<script>
import firebaseApp from '../main.js'
import { getFirestore} from "firebase/firestore";
import { doc , getDoc} from "firebase/firestore";
import { getAuth } from "firebase/auth";

import StudentJobTypeChart from '@/components/StudentJobTypeChart.vue'
import StudentCompDistributionChart from '@/components/StudentCompDistributionChart.vue'

const studentData = {
    numberOfRejections: '3',
    appInProgress: '11',
    appComp: '14'
  }

export default {
    components: {
        StudentJobTypeChart,
        StudentCompDistributionChart
    },
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
    grid-row: 1/3;
    background-color: rgba(102, 97, 97, 0.397);
}

.appInProgress {
    grid-column: 1;
    grid-row: 3/5;
    background-color: rgba(102, 97, 97, 0.397);
}
.appComp {
    grid-column: 1;
    grid-row: 5/7;
    background-color: rgba(102, 97, 97, 0.397);
}
.jobType {
    grid-column: 2/4;
    grid-row: 1/4;
    background-color: rgba(102, 97, 97, 0.397);
}

.companyDistri {
    grid-column: 2/4;
    grid-row: 4/7;
    background-color: rgba(102, 97, 97, 0.397);
}
</style>