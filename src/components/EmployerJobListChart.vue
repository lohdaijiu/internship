<template>

  <bar-chart class="user" width=500px :data = "chartData"></bar-chart>
  <!--
  <button @click= "updateMe()">Click to update the stats</button>
  -->
</template>
 
<script>
import firebaseApp from '../main.js'
import { getFirestore} from "firebase/firestore";
import { doc , getDoc} from "firebase/firestore";
import { getAuth } from "firebase/auth";



export default {
  name: "EmployerJobListChart",
  data() {
    return {
      chartData: { },
      numOfApplicants: [],
      jobNameArr: []
    }
  },
  async beforeMount() {
    const db = getFirestore(firebaseApp);
    const auth = getAuth()
    const id = auth.currentUser.uid
    const docRef = doc(db, "User", id);
    const docSnap = await getDoc(docRef);
  
    const jobArr = docSnap.data().Jobs;
    const companyName = docSnap.data().CompanyName;
    //console.log(jobArr);
    //console.log(companyName);
    for (var i = 0; i < jobArr.length; i++) {
          
      let docName = companyName.concat(" - ", jobArr[i]);
      const docRef = doc(db, "Job", docName);
      const docSnap = await getDoc(docRef);
      //console.log(docSnap);
      const applicantsArr = docSnap.data().Applicants;
      //console.log(applicantsArr);
      this.numOfApplicants[i] = applicantsArr.length;
      this.jobNameArr.push(jobArr[i]);
    }
    this.updateMe();
  },
  methods:{
    updateMe: function() {
          
          this.chartData = {}
          //console.log(jobNameArr);
          //console.log(numOfApplicants)
          for (var i = 0; i < this.jobNameArr.length; i++){
              // console.log(numOfApplicants[i])
              this.chartData[this.jobNameArr[i]] = this.numOfApplicants[i];
          }
          
          console.log(this.chartData);
    }
          
          //console.log(this.chartData.Target);         
    }
           

        }

</script>

<style scoped>
.user{
  margin: auto;
  border: 3px solid white;
  color: #A5A6F6;
}
</style>