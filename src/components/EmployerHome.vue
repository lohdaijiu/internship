<template>
  <div id="welcome">
    <h1>Welcome, {{ name }}!</h1>
  </div>
  <div class="analytics">
    <h2>Analytics</h2>
  </div>

  <div class="statistics" data="employerData">
    <div class="numOfListedRoles">
      <br />
      Number Of Listed Roles
      <br /><br />
      <div class="number">
        {{ numOfListedRoles }}
      </div>
    </div>
    <div class="jobType">
      <br />
      Number of Applicants for each job listing
      <br /><br />
      <EmployerJobListChart></EmployerJobListChart>
    </div>
  </div>
</template>
<script>
import firebaseApp from "../main.js";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import EmployerJobListChart from "@/components/EmployerJobListChart.vue";

//var numOfListedRoles = 0

export default {
  components: {
    EmployerJobListChart,
  },
  data() {
    return { keyword: "", numOfListedRoles: 0, name: "" };
  },
  async created() {
    const db = getFirestore(firebaseApp);
    const auth = getAuth();
    const id = auth.currentUser.uid;
    const docRef = doc(db, "User", "" + id);
    const docSnap = await getDoc(docRef);
    //console.log(docSnap.data());
    this.name = docSnap.data().CompanyName;
    const jobArr = docSnap.data().Jobs;
    for (var i = 0; i < jobArr.length; i++) {
                const docRef1 = doc(db, "Job", this.name + " - " + jobArr[i]);
                //console.log(docRef1);
                const docSnap1 = await getDoc(docRef1);
                console.log(docSnap1.data().Deleted);
                if (docSnap1.data().Deleted == false){
                  this.numOfListedRoles = this.numOfListedRoles + 1;
                }
    }
    //console.log(jobArr)
    //this.numOfListedRoles = jobArr.length;
  },

  methods: {},
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap");
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
  grid-template-rows: 80px 80px;
  grid-gap: 30px;
  text-align: center;
  justify-content: space-between;
  font-family: "Poppins", sans-serif;
  color: #1f1d2a;
  font-size: 16px;
  margin: 0 50px 50px 50px;
}

.numOfListedRoles {
  grid-column: 1;
  grid-row: 1/3;
  background-color: white;
  border-radius: 20px;
}

.jobType {
  grid-column: 2/4;
  grid-row: 1/4;
  background-color: white;
  border-radius: 20px;
}

.number {
  color: #a5a6f6;
  font-size: 25px;
  text-align: center;
  justify-content: space-between;
  font-family: "Poppins", sans-serif;
  font-weight: bold;
}
</style>