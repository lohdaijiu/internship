!
<template>
  <div v-if="done">
    <NavBar /> <br />
    <h1>Application DashBoard</h1>
    <br />

    <el-row>
      <el-col :span="4"></el-col>
      <el-col :span="16">
        <el-table
          :data="tableData"
          style="width: 100%"
          default-expand-all
          :header-row-style="headerStyle"
          :row-style="dataStyle"
          :header-cell-style="headerCellStyle"
        >
          <el-table-column prop="companyname" label="Company" width="180" />
          <el-table-column prop="jobpos" label="Job Position" min-width="200" />
          <el-table-column prop="date" label="Date Applied" min-width="130" />
          <el-table-column prop="status" label="Progress" min-width="80" />
          <el-table-column
            prop="status"
            label="Accept/Reject Offer"
            width="170"
          >
            <template #default="scope">
              <el-button
                size="small"
                type="success"
                @click="accept(scope.row)"
                v-if="rendered(scope.row)"
                >Accept</el-button
              >
              <el-button
                size="small"
                type="warning"
                @click="reject(scope.row)"
                v-if="rendered(scope.row)"
                >Reject</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="status"  min-width="55" fixed = "right">
            <template #default="scope">
              <el-button
                size="small"
                type="info"
                @click="call(scope.row)"
                v-if="haveVideo(scope.row)"
                >Video Call</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import NavBar from "../../components/StudentNav.vue";
import { getDoc, getFirestore, doc, updateDoc } from "firebase/firestore";
import firebaseApp from "../../main.js";
import { getAuth } from "firebase/auth";

var tableData = [];

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      tableData,
      done: false,
      headerStyle: {
        color: "#808080",
        "font-family": "Poppins",
        "font-weight": 500,
        "font-size": "14px",
      },
      headerCellStyle: {
        "background-color": "#96C67F",
        color: "#1F1D2A",
        "margin-bottom": "20px ",
      },
      dataStyle: {
        "font-family": "Poppins",
        "font-weight": 300,
        "font-size": "13px",
      },
    };
  },
  methods: {
    rendered(x) {
      if (x.status == "Pending student reply") {
        return true;
      } else {
        return false;
      }
    },

    haveVideo(x) {
      return x.videocall;
    },

    async accept(x) {
      const id = getAuth().currentUser.uid;
      const db = getFirestore(firebaseApp);
      const docName = x.companyname.concat(" - ", x.jobpos, " - ", id);

      await updateDoc(doc(db, "Application", docName), {
        Status: "Accepted by Student",
      });

      alert("Offer Accepted");
      window.location.reload();
    },

    async reject(x) {
      const id = getAuth().currentUser.uid;
      const db = getFirestore(firebaseApp);
      const docName = x.companyname.concat(" - ", x.jobpos, " - ", id);

      await updateDoc(doc(db, "Application", docName), {
        Status: "Rejected by Student",
      });

      alert("Offer Rejected");
      window.location.reload();
    },

    call(x) {
      const id = getAuth().currentUser.uid;
      this.$router.push({ path: "/studentvideocall", query: { id: x.companyname.concat(" - ", x.jobpos, " - ", id) } })
    }
  },

  async beforeCreate() {
    async function getData() {
      tableData = [];

      try {
        const id = getAuth().currentUser.uid;
        const db = getFirestore(firebaseApp);
        const docRef = doc(db, "User", id);
        const doc1 = await getDoc(docRef);
        const jobArr = doc1.data().JobsApplied;

        for (var i = 0; i < jobArr.length; i++) {
          const docRef1 = doc(db, "Application", jobArr[i]);
          const document1 = await getDoc(docRef1);
          const jobInfo = document1.data();
          // console.log(jobInfo)
          tableData.push({
            companyname: jobInfo.CompanyName,
            jobpos: jobInfo.Position,
            date: jobInfo.CreatedAt.toDate().toString().slice(4, 15),
            progress: jobInfo.Progress,
            status: jobInfo.Status,
            videocall: jobInfo.VideoCall,
          });
        }
        console.log("done");
      } catch (error) {
        console.error(error);
      }
    }

    await getData().then(() => {
      this.done = true;
    });
    console.log(tableData);
  },
};
</script>

<style scoped>
h1 {
  font-family: "Poppins";
  text-align: center;
}
</style>
