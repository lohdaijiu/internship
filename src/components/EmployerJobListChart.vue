<template>

  <bar-chart class="user" width=500px :data = "chartData"></bar-chart>
  <button @click= "updateMe()">Click to update the stats</button>
</template>
 
<script>
import firebaseApp from '../main.js'
import { getFirestore} from "firebase/firestore";
import { doc , getDoc} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const jobNameArr = [];
export default {
  name: "EmployerJobListChart",
  data() {
    return {
      chartData: { }
    }
  },
  async created() {
    const db = getFirestore(firebaseApp);
    const auth = getAuth()
    const id = auth.currentUser.uid
    const docRef = doc(db, "User", "" + id);
    const docSnap = await getDoc(docRef);
    const jobArr = docSnap.data().Jobs;
   
    for (var i = 0; i < jobArr.length; i++) {
          jobNameArr.push(jobArr[i]);
    }
  },
  methods:{
    updateMe: function() {
            //console.log(jobArr);
          this.chartData = {}
          for (var i = 0; i < jobNameArr.length; i++)
              if (jobNameArr[i] in this.chartData){
                  const temp = this.chartData[jobNameArr[i]];
                  this.chartData[jobNameArr[i]] = temp + 1;
              } else {
                  this.chartData[jobNameArr[i]] = 1;
                  //console.log(this.chartData[jobNameArr[i]]);
              }
          console.log(this.chartData);  
          //console.log(this.chartData.Target);         
    }
           

        }
  }
</script>

<style scoped>
.user{
  margin: auto;
  border: 3px solid grey;
}
</style>