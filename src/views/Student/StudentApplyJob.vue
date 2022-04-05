<template>
  <StudentNav />
  <br />
  <h1>Job Application</h1>

  <el-row class="content-container">
    <el-col :span="3"></el-col>
    <!-- <div id="contentContainer"> -->
    <!-- Cards -->
    <el-col :span="18">
      <el-card shadow="hover">
        <el-row class="table-container">
          <el-col :span="3"></el-col>
          <el-col :span="18">
            <el-table
              ref="tableRef"
              :data="tableData"
              style="width: 100%"
              max-height="550"
              :table-layout="auto"
              :header-row-style="headerStyle"
              :row-style="dataStyle"
              :header-cell-style="headerCellStyle"
            >
              <!-- @row-click="viewListing(row)" -->
              <el-table-column prop="company_name" label="Company Name" />
              <el-table-column prop="jobpos" label="Job Position" />
              <el-table-column prop="range" label="Date Range" />
            </el-table>
          </el-col>
          <el-col :span="3"></el-col>
        </el-row>
        <div id="subContainer">
          <h3>Short Writeup</h3>

          <el-input
            class="writeup"
            v-model="textarea"
            maxlength="300"
            placeholder="Please enter here"
            show-word-limit
            type="textarea"
            :rows="6"
            ref="writeup"
          />
          <!-- <textarea type="text" placeholder="Please enter here"> </textarea> -->
        </div>
        <!-- </div> -->
        <el-row class="button-container">
          <el-col :span="6" class="applycol"
            ><el-button
              id="applyButton"
              @click="apply().then(window.location.reload())"
              color="#96C67F"
              ><p class="btn-text">Submit</p></el-button
            ></el-col
          >
          <!-- <el-col :span="2"><div class="grid-content" /></el-col> -->
          <el-col :span="6" class="cancelcol"
            ><el-button id="cancelButton" @click="goBack()" color="#9b948e"
              ><p class="btn-text">Cancel</p></el-button
            ></el-col
          >
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="3"></el-col>
  </el-row>
</template>

<script>
import StudentNav from "../../components/StudentNav.vue";
import {
  setDoc,
  getDoc,
  getFirestore,
  updateDoc,
  arrayUnion,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import firebaseApp from "../../main.js";
import { getAuth } from "firebase/auth";
import { ref } from "vue";
import { alertMsg } from "../../functions/alertMsg";
var text = ref("");
var textarea = ref("");

export default {
  name: "StudentApplyJob",

  components: {
    StudentNav,
  },
  data() {
    return {
      company_name: "",
      jobpos: "",
      range: "",
      writeup: "",
      textarea,
      text,
      tableData: [],
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

  async beforeCreate() {
    const db = getFirestore(firebaseApp);
    const docRef = doc(db, "Job", this.$route.query.job);
    const docSnap = await getDoc(docRef);
    this.company_name = docSnap.data().CompanyName;
    this.jobpos = docSnap.data().InternshipTitle;
    const startDate = docSnap
      .data()
      .DateRange[0].toDate()
      .toString()
      .slice(4, 15);
    const endDate = docSnap
      .data()
      .DateRange[1].toDate()
      .toString()
      .slice(4, 15);
    this.range = startDate.concat(" - ", endDate);
    this.textarea = "";
    this.text = "";
    this.$refs.writeup.value = "";
    this.tableData.push({
      company_name: this.company_name,
      jobpos: this.jobpos,
      range: this.range,
    });
  },

  async created() {
    this.textarea = "";
    this.text = "";
  },

  methods: {
    goBack() {
      this.$router.push("/studentjobboard");
    },
    async apply() {
      const db = getFirestore(firebaseApp);
      const id = getAuth().currentUser.uid;
      const applicationName = this.company_name.concat(
        " - ",
        this.jobpos,
        " - ",
        id
      );
      const jobName = this.$route.query.job;
      const docRef = doc(db, "Application", applicationName);
      const docSnap = await getDoc(docRef);
      const docRef1 = doc(db, "Job", jobName);
      const docRef2 = doc(db, "User", id);

      if (docSnap.exists()) {
        alertMsg("error", "You have already applied for this position");
      } else {
        try {
          //Add document into application db

          const data = {
            CreatedAt: serverTimestamp(),
            Applicant: id,
            Position: this.jobpos,
            Status: "Pending",
            CompanyName: this.company_name,
            Writeup: this.textarea,
          };

          await setDoc(docRef, data);
          await updateDoc(docRef1, { Applicants: arrayUnion(id) });
          await updateDoc(docRef2, {
            JobsApplied: arrayUnion(applicationName),
          });
          alertMsg("success", "Job applied!");

          this.$router.push("/applicationdashboard");
        } catch (error) {
          alertMsg("error", "There was an error processing the application");
          console.log(error);
        }
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap");
.content-container {
  margin-top: 40px;
}

.table-container {
  margin-top: 30px;
}
.button-container {
  margin-bottom: 30px;
}
.job-text {
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  margin: 20px;
}

h2 {
  font-family: "Poppins";
  text-align: center;
}
h3 {
  font-family: "Poppins";
  text-align: left;
}

.box-card {
  margin-top: 10px;
  width: 80%;
  height: 160px;
  font-family: "Poppins";
}

.applycol {
  margin-left: 33%;
  width: 15%;
  /* padding-right: 2%; */
}
.cancelcol {
  width: 15%;
  /* padding-left: 2%; */
  /* min-height: 200px; */
  /* float: right; */
  /* justify-content: flex-end; */
}

.writeup {
  border: #ccc;
  background-color: #f8f8f8;
  box-sizing: border-box;
  font-family: sans-serif;
  font-weight: 600;
  color: #1f1d2a;
  font-size: 15px;
  border-radius: 15px;
  /* max-width: 30%; */
}

#buttonContainer {
  margin-bottom: 40px;
}

#contentContainer {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  width: 80%;
  text-align: left;
  overflow: auto;
  resize: none;
  min-height: 500px;
}
#mainContainer {
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  flex-direction: row;
  width: 80%;
  /* margin-top: 5%; */
  margin-bottom: 1%;
  margin-left: 9.5%;
  margin-right: 5%;
  padding-bottom: 4%;
  min-height: 500px;
  border-radius: 30px;
  background-color: white;
}
span {
  margin-left: 97%;
}

#subContainer {
  display: flex;
  justify-content: center;
  align-items: left;
  flex-direction: column;
  margin-top: 2%;
  margin-left: 4%;
  margin-right: 4%;
  margin-bottom: 50px;
  text-align: left;
  width: 90%;
  resize: none;
  overflow: auto;
  min-height: 100px;
}
</style>