<template>
    <body>
        <div class ='welcome'>
                <h1>Welcome, {{name}}!</h1>
        </div>
        <div class ='analytics'>
                <h2>Analytics</h2>
        </div>
    
        <div class="statistics" data="studentData">
            <div class="numberOfRejections">
                <br><br>
                Number Of Rejections
                <br><br>
                <div class ="number">
                {{numberOfRejections}}
                </div>
            </div>
            <div class="appInProgress">
                <br><br>
                Application in progress
                <br><br>
                <div class ="number">
                {{appInProgress}}
                </div>
            </div>
            <div class="appComp">
                <br><br>
                Applications Completed
                <br><br>
                <div class ="number">
                {{appComp}}
                </div>
            </div>
            <div class="jobType">
                <br>
                Job Types of My Application
                <br><br>
                <StudentJobTypeChart></StudentJobTypeChart>
                <br>
                </div>
            <div class="companyDistri">
                <br>
                Company Distribution of My Application
                <br><br>
                <StudentCompDistributionChart></StudentCompDistributionChart>
                <br>
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

//const studentData = {numberOfRejections:0, appInProgress:0,  appComp: 0}

export default {
    components: {
        StudentJobTypeChart,
        StudentCompDistributionChart
    },
    data() {
            return { keyword: '', 
            numberOfRejections: 0,
            appInProgress: 0,
            appComp: 0,
            name: ''};
    },

    async created() {
            const db = getFirestore(firebaseApp);
            const auth = getAuth()
            const id = auth.currentUser.uid
            const docRef = doc(db, "User", "" + id);
            const docSnap = await getDoc(docRef);
            this.name = docSnap.data().Name;
            const jobArr = docSnap.data().JobsApplied;
            this.jobType = new Map();
            
            for (var i = 0; i < jobArr.length; i++) {
                const docRef1 = doc(db, "Application", jobArr[i]);
                const document1 = await getDoc(docRef1);
                const jobInfo = document1.data();
                //console.log(jobInfo);

                if (jobInfo.Status.toString() == "Rejected") {
                    this.numberOfRejections = this.numberOfRejections + 1;
                }
                        
                if (jobInfo.Status.toString() == "Pending") {

                    this.appInProgress = this.appInProgress + 1;
                }
                        
                if (jobInfo.Status.toString() == "Accepted"){
                    this.appComp = this.appComp + 1;
                }
                        
                }
            
            //console.log("done")
            
        },
    
    methods: {

    }
}  

</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap");
.welcome {
    text-align: center;
    justify-content: space-between;
    font-family: "Poppins", sans-serif;
    color: #1f1d2a;
    font-size: 20px;
}
.analytics {
    text-align: center;
    justify-content: space-between;
    font-family: "Poppins", sans-serif;
    color: #1f1d2a;
    font-size: 16px;
}

.statistics {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 100px 100px;
    grid-gap: 50px;
    text-align: center;
    justify-content: space-between;
    font-family: "Poppins", sans-serif;
    color: #1f1d2a;
    font-size: 20px;
}

.number {
    color: #96C67F;
    font-size: 25px;
    text-align: center;
    justify-content: space-between;
    font-family: "Poppins", sans-serif,;
    font-weight: bold;
}

.numberOfRejections {
    grid-column: 1;
    grid-row: 1/3;
    background-color: white;
    border-radius: 20px;
}

.appInProgress {
    grid-column: 1;
    grid-row: 3/5;
    background-color: white;
    border-radius: 20px;
}
.appComp {
    grid-column: 1;
    grid-row: 5/7;
    background-color: white;
    border-radius: 20px;
}
.jobType {
    grid-column: 2/4;
    grid-row: 1/4;
    background-color: white;
    border-radius: 20px;
}

.companyDistri {
    grid-column: 2/4;
    grid-row: 4/7;
    background-color: white;
    border-radius: 20px;
}
</style>