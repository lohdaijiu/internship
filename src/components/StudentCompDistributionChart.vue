<template>

  <pie-chart class="user" width=500px :data = "chartData"
  :colors="[
      '#96c67f',
      '#90EE90',
      '#008000',
      '#006400',
      '#556B2F',
      '#228B22',
      '#32CD32'
    ]"
  ></pie-chart>
  <!--
  <button @click= "updateMe()">Click to update the stats</button>
  -->
</template>

<script>
import firebaseApp from '../main.js'
import { getFirestore} from "firebase/firestore";
import { doc , getDoc} from "firebase/firestore";
import { getAuth } from "firebase/auth";

var compArr = [];
export default {
  name: "StudentCompDistributionChart",
  data() {
    return {
      chartData : {},
    }
  },
  async created() {
    const db = getFirestore(firebaseApp);
    const auth = getAuth()
    const id = auth.currentUser.uid
    const docRef = doc(db, "User", "" + id);
    const docSnap = await getDoc(docRef);
    const jobArr = docSnap.data().JobsApplied;
    for (var i = 0; i < jobArr.length; i++) {
                const docRef1 = doc(db, "Application", jobArr[i]);
                const document1 = await getDoc(docRef1);
                const jobInfo = document1.data();
                //console.log(jobInfo);
                const compName = jobInfo.CompanyName;
                //console.log(compName);
                compArr.push(compName);
    }
    this.updateMe();
    compArr = [];
  },
  methods:{
    updateMe: function() {
            //console.log(jobArr);
          this.chartData = {}
          console.log(compArr.length)
          for (var i = 0; i < compArr.length; i++)
              if (compArr[i] in this.chartData){
                  const temp = this.chartData[compArr[i]];
                  this.chartData[compArr[i]] = temp + 1;
              } else {
                  this.chartData[compArr[i]] = 1;
                  //console.log(this.chartData[jobNameArr[i]]);
              }
          //console.log(this.chartData);  
          //console.log(this.chartData.Target);         
    }    
        }

  }

</script>

<style scoped>
.user{
  margin: auto;
  border: 3px solid white;
  color: #96C67F;
}
</style>