<template>
  <pie-chart
    class="user"
    width="500px"
    style="--p: 60; --b: 10px; --c: purple"
    :data="chartData"
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
import firebaseApp from "../main.js";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
//var chartData = new Map();
var jobNameArr = [];

export default {
  name: "StudentJpbTypeChart",
  data() {
    return {
      chartData : {},
    };
  },
  async created() {
    const db = getFirestore(firebaseApp);
    const auth = getAuth();
    const id = auth.currentUser.uid;
    const docRef = doc(db, "User", "" + id);
    const docSnap = await getDoc(docRef);
    const jobArr = docSnap.data().JobsApplied;
    for (var i = 0; i < jobArr.length; i++) {
      const docRef1 = doc(db, "Application", jobArr[i]);
      const document1 = await getDoc(docRef1);
      const jobInfo = document1.data();
      const jobName = jobInfo.Position;
      //console.log(jobName);
      jobNameArr.push(jobName);
    }
    this.updateMe();
    jobNameArr = [];
  },
  methods: {
    updateMe: function () {
      this.chartData = {}
      console.log(jobNameArr.length)
      for (var i = 0; i < jobNameArr.length; i++)
        if (jobNameArr[i] in this.chartData) {
          const temp = this.chartData[jobNameArr[i]];
          this.chartData[jobNameArr[i]] = temp + 1;
        } else {
          this.chartData[jobNameArr[i]] = 1;
          //console.log(this.chartData[jobNameArr[i]]);
        }
    },
  },
};
</script>

<style scoped>
.user {
  margin: auto;
  border: 3px solid white;
  size-adjust: auto;
  color-adjust: #96c67f;
  caret-color: #96c67f;
}
</style>