<template>
        <div id ='welcome'>
                <h1>Welcome, {{name}}!</h1>
        </div>
        <div id ='analytics'>
                <h2>Analytics</h2>
        </div>
    
        <div class="statistics" data="employerData">
            <div class="numOfListedRoles">
                <br>
                Number Of Listed Roles
                <br>
                {{numOfListedRoles}}
            </div>
            <div class="jobType">
                Number of Applicants for each job listing
                <br>
                <EmployerJobListChart></EmployerJobListChart>
            </div>
        </div>
   
</template>
<script>
import firebaseApp from '../main.js'
import { getFirestore} from "firebase/firestore";
import { doc , getDoc} from "firebase/firestore";
import { getAuth } from "firebase/auth";

import EmployerJobListChart from '@/components/EmployerJobListChart.vue'

//var numOfListedRoles = 0

export default {
    components: {
        EmployerJobListChart
    },
    data() {
            return { keyword: "", 
            numOfListedRoles: " ",
            name: ''};

    },
    async created() {
            
            const db = getFirestore(firebaseApp);
            const auth = getAuth()
            const id = auth.currentUser.uid
            const docRef = doc(db, "User", "" + id);
            const docSnap = await getDoc(docRef);
            this.name = docSnap.data().CompanyName;
            const jobArr = docSnap.data().Jobs;
            //console.log(jobArr)
            this.numOfListedRoles = jobArr.length;
           
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

.numOfListedRoles {
    grid-column: 1;
    grid-row: 1/3;
    background-color: rgba(102, 97, 97, 0.397);
}

.jobType {
    grid-column: 2/4;
    grid-row: 1/4;
    background-color: rgba(102, 97, 97, 0.397);
}

</style>