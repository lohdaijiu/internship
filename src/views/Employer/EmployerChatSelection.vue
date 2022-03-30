<template>
  <NavBar />

<div style="margin-top: 5%;">
  <el-table
    :data="chatArr"
    style="width: 50%; margin-top: 5%; margin:auto"
    row-key="id"
    align = "center"
    size = "large"
  >
    <el-table-column prop="nameid" label="Applicant Name" width="270" />
    <el-table-column prop="jobsInSameCoy" label="Jobs Applied" width="540" />
    <el-table-column width="120">
        <template #default="scope">
      <el-button
        size="small"
        type="info"
        @click="goToChat(scope.row.uid)"
        >View Message</el-button
      >
        </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import { getAuth } from "firebase/auth";
import firebaseApp from "../../main.js";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import NavBar from "../../components/EmployerNav.vue";

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      chatArr: [],
    };
  },

  methods: {
    goToChat(x) {
      this.$router.push({ path: "/employerchat", query: { id: x } });
    },
  },

  async beforeCreate() {

    const id = getAuth().currentUser.uid;
    const db = getFirestore(firebaseApp);
    const docRef = doc(db, "User", id);
    const docSnap = await getDoc(docRef);

    const employerName = docSnap.data().CompanyName;

    const chats = docSnap.data().Chats;
    
    for (var i = 0; i < chats.length; i++) {
      const currChat = chats[i];
      console.log(i)
      const docRef1 = doc(db, "User", currChat);
      const docSnap1 = await getDoc(docRef1);

      const name = docSnap1.data().Name;
      const jobsApplied = docSnap1.data().JobsApplied;
      var jbs = "";

      for (var j = 0; j < jobsApplied.length; j++) {
        const curr = jobsApplied[j];
        const arr = curr.split(" - ");
        if (arr[0] == employerName) {            
          jbs = jbs.concat(arr[1], ", ");
        }
      }

      jbs = jbs.slice(0, -2);


      this.chatArr.push({
        uid: currChat,
        nameid: name,
        jobsInSameCoy: jbs,
      });
    }
    console.log(this.chatArr)
  },
};
</script>

<style>
.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>
