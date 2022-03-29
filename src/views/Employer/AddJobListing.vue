
<template>
  <NavBar/>

  <br><br>

  <el-form :model="form" label-width="120px" >
    <el-form-item label="Internship Title">
      <el-input v-model="form.internshipTitle" />
    </el-form-item>

    <el-form-item label="Job Description">
      <el-input v-model="form.jobDesc" type="textarea" />
    </el-form-item>

    <el-form-item label="Preferred Competencies">
      <el-input v-model="form.preferredCom" type="textarea" />
    </el-form-item>

    <el-form-item label="Undergraduate Year" >
      <el-checkbox-group v-model="form.year">
        <el-checkbox label="Year 1" name="type" />
        <el-checkbox label="Year 2" name="type" />
        <el-checkbox label="Year 3" name="type" />
        <el-checkbox label="Year 4" name="type" />
      </el-checkbox-group>
    </el-form-item>

    <el-form-item label="Work Duration">
      <el-select v-model="form.duration">
        <el-option label="3 Months" value="3" />
        <el-option label="6 Months" value="6" />
        <el-option label="9 Months" value="9" />
        <el-option label="1 Year" value="12" />
        <el-option label="More than a year" value=">12" />
      </el-select>
    </el-form-item>

    <el-form-item label="Date Range">
      <el-date-picker
        v-model="form.daterange"
        type="daterange"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
      />
    </el-form-item>

     <el-form-item label="Nature of Work">
      <el-radio-group v-model="form.type">
        <el-radio label="On-site" />
        <el-radio label="Remote" />
      </el-radio-group>
    </el-form-item>

    <el-form-item label="Renumeration" >
      <el-input v-model="form.renum"/>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="addJob()">Create</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
import { getAuth } from "firebase/auth";
import firebaseApp from "../../main.js";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, getDoc, updateDoc, arrayUnion, serverTimestamp } from "firebase/firestore";
import { reactive } from "vue";
import NavBar from "../../components/EmployerNav.vue"



export default {
  data() {
    return {
      form: reactive({
        internshipTitle: "",
        jobDesc: "",
        preferredCom: "",
        year: [],
        duration: "",
        type: "",
        renum: "",
        daterange: "",
      }),
      internshipTitle: "",
      jobDesc: "",
      preferredCom: "",
      year: [],
      duration: "",
      type: "",
      renum: "",
      daterange: "",
    };
  },

  methods: {

    // async getCompanyName() {
    //   const db = getFirestore(firebaseApp);
    //   if (getAuth().currentUser == null) {
    //     return null;
    //   }
    //   const docRef = doc(db, "User", getAuth().currentUser.uid);
    //   const docSnap = await getDoc(docRef);

    //   try {
    //     return docSnap.data().CompanyName;
    //   } catch {
    //     console.log("error")
    //   }  
    // },

    async addJob() {

      const db = getFirestore(firebaseApp);
      const docRef1 = doc(db, "User", getAuth().currentUser.uid)
      const companyName1 = await getDoc(docRef1);
      const companyName = companyName1.data().CompanyName
      let docName = companyName.concat(" - ", this.form.internshipTitle)
      const docRef = doc(db, "Job", docName)
      const docSnap = await getDoc(docRef);
      const id = getAuth().currentUser.uid
      var errorboolean = true;

      if (docSnap.exists() == false) {
        
        const data = {
          InternshipTitle: this.form.internshipTitle,
          JobDescription: this.form.jobDesc,
          PreferredCompetencies: this.form.preferredCom,
          Year: this.form.year,
          Duration: this.form.duration,
          Type: this.form.type,
          CompanyName: companyName,
          Renumeration: this.form.renum,
          Applicants: [],
          CreatedAt : serverTimestamp(),
          DateRange: this.form.daterange,
          Deleted : false
        };
        try {
          const docRef1 = doc(db, "Job", docName);
          const docRef2 = doc(db, "User", id);
          await setDoc(docRef1, data);
          await updateDoc(docRef2, {Jobs : arrayUnion(this.form.internshipTitle)});
          
          alert("Job Created!")
        } catch (error) {
          console.error(error)
          errorboolean = false;
        }

        if (!errorboolean) {
          //this.$router.push("/employerhome")
        }
      } else { //same internship title
        alert("Please choose a new internship title")

      }

        
      }
    },
  components : {
    NavBar
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap");

.btn-text {
  color: #1f1d2a;
  font-weight: 600;
}
.login-btns {
  width: 100%;
  border: 1px solid black;
}
.register-btns {
  margin-top: 20px;
  width: 100%;
}
.header-row {
  margin-top: 20px;
}
.header-brand {
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  color: #1f1d2a;
  margin: 0;
  font-size: 28px;
  text-align: center;
}
.el-header {
  background-color: #96c67f;
  height: 80px;
}
.el-row {
  /* margin-top: 20px; */
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
/* .grid-content {
  border-radius: 4px;
  min-height: 36px;
} */
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #fafafa;
}
</style>
<style>
.input-labels .el-form-item__label {
  font-family: "Poppins", sans-serif;
  font-size: 15px;
  font-weight: 500;
}
</style>