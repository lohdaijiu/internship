
<template>
  <NavBar />
  <h1>Edit Internship Listing</h1>
  <el-row>
    <el-col :span="2"></el-col>
    <el-col :span="20">
      <el-card class="card" shadow="hover">
        <el-form
          :model="form"
          label-position="top"
          :rules="rules"
          ref="ruleFormRef"
        >
          <el-form-item label="Internship Title" prop="internshipTitle">
            <el-input v-model="form.internshipTitle" type="text" />
          </el-form-item>

          <el-form-item label="Job Description" prop="jobDesc">
            <el-input
              v-model="form.jobDesc"
              :autosize="{ minRows: 3, maxRows: 6 }"
              type="textarea"
            />
          </el-form-item>

          <el-form-item label="Preferred Competencies" prop="preferredCom">
            <el-input
              v-model="form.preferredCom"
              :autosize="{ minRows: 3, maxRows: 6 }"
              type="textarea"
            />
          </el-form-item>

          <el-form-item label="Undergraduate Year" prop="year">
            <el-checkbox-group v-model="form.year">
              <el-checkbox label="Year 1" name="type" />
              <el-checkbox label="Year 2" name="type" />
              <el-checkbox label="Year 3" name="type" />
              <el-checkbox label="Year 4" name="type" />
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="Work Duration" prop="duration">
            <el-select v-model="form.duration">
              <el-option label="3 Months" value="3" />
              <el-option label="6 Months" value="6" />
              <el-option label="9 Months" value="9" />
              <el-option label="1 Year" value="12" />
              <el-option label="More than a year" value=">12" />
            </el-select>
          </el-form-item>

          <el-form-item label="Date Range" prop="daterange">
            <el-date-picker
              v-model="form.daterange"
              type="daterange"
              range-separator="To"
              start-placeholder="Start date"
              end-placeholder="End date"
            />
          </el-form-item>

          <el-form-item label="Nature of Work" prop="type">
            <el-radio-group v-model="form.type">
              <el-radio label="On-site" />
              <el-radio label="Remote" />
            </el-radio-group>
          </el-form-item>

          <el-form-item label="Renumeration" size="large" prop="renum">
            <el-input v-model="form.renum" type="number">
              <template #prepend>$ </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-col :span="7"></el-col>
            <el-col :span="4">
              <el-button
                @click="submitClick()"
                class="add-btn"
                size="large"
                color="#A5A6F6"
                ><p class="btn-text">Confirm</p>
              </el-button>
            </el-col>
            <el-col :span="2"></el-col>
            
            <el-col :span="4">
              <el-button
                @click="goBack()"
                class="add-btn"
                size="large"
                color="#99a9bf"
                ><p class="btn-text">Cancel</p>
              </el-button>
            </el-col>            
            <el-col :span="7"></el-col>
          </el-form-item>
        </el-form>
      </el-card>

    </el-col>
  </el-row>
  <el-col :span="2"></el-col>
</template>

<script>
// @flow
import { getAuth } from "firebase/auth";
import firebaseApp from "../../main.js";
import { arrayRemove, getFirestore } from "firebase/firestore";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import { reactive, ref } from "vue";
import NavBar from "../../components/EmployerNav.vue";
import { alertMsg } from "../../functions/alertMsg";
import type { FormInstance } from "element-plus";
var rules = reactive({
  internshipTitle: [
    {
      required: true,
      message: "Please input Internship Title",
      trigger: "blur",
    },
  ],
  jobDesc: [
    {
      required: true,
      message: "Please select Job Description",
      trigger: "blur",
    },
  ],
  preferredCom: [
    {
      required: true,
      message: "Please input Preferred Competencies",
      trigger: "blur",
    },
  ],
  year: [
    {
      type: "array",
      required: true,
      message: "Please select at least one undergraduate year",
      trigger: "change",
    },
  ],
  duration: [
    {
      required: true,
      message: "Please choose Work Duration",
      trigger: "change",
    },
  ],
  daterange: [
    {
      required: true,
      message: "Please pick a date",
      trigger: "change",
    },
  ],
  type: [
    {
      required: true,
      message: "Please choose Nature of Work",
      trigger: "change",
    },
  ],
  renum: [
    {
      required: true,
      message: "Please input Renumeration",
      trigger: "blur",
    },
  ],
});

export default {
    name: "EmployerEditListing",

  data() {
    return {
      ruleFormRef: ref<FormInstance>(),
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
      rules,
      validStatus: false,
      originalTitle: "",
      originalApplicants: "",
    };
  },

    async created() {
        const db = getFirestore(firebaseApp);

        const listingName = this.$route.query.jobId;
        const docRef = doc(db, "Job", listingName);
        const docSnap = await getDoc(docRef);

        let arrayData = docSnap.data();
        // console.log("InternshipTitle", arrayData["InternshipTitle"]);

        this.form.internshipTitle = arrayData["InternshipTitle"],
        this.form.jobDesc = arrayData["JobDescription"],
        this.form.preferredCom=  arrayData["PreferredCompetencies"],
        this.form.year= arrayData["Year"],
        this.form.duration= arrayData["Duration"],
        this.form.type= arrayData["Type"],
        this.form.renum= arrayData["Renumeration"],
        this.form.daterange= arrayData["DateRange"];
        this.originalTitle = this.form.internshipTitle
        this.originalApplicants = arrayData["Applicants"];
        console.log(this.originalApplicants)


// TESTING
        const docRef1 = doc(db, "User", getAuth().currentUser.uid);

        const companyName1 = await getDoc(docRef1);
        // console.log("print 281", this.form.internshipTitle, companyName1);
        const companyName = companyName1.data().CompanyName;
        let docName = companyName.concat(" - ", this.form.internshipTitle);

        // console.log("title", this.originalTitle)
        this.originalApplicants.forEach(async (id) => {

          console.log(id)

          // remove from student user JobApplied array
          const stuDocRef = doc(db, "User", id);
          const stuDocSnap = await getDoc(stuDocRef);
          const applied = stuDocSnap.data()["JobsApplied"];
          console.log("applied", applied)
          const applicationName = docName.concat(" - ", id)
          // await updateDoc(stuDocRef, {
          //     JobsApplied: arrayRemove(applicationName),
          // });

          // remove from application
          const applyDocRef = doc(db, "Application", applicationName);
          const applyDocSnap = await getDoc(applyDocRef);
          const applicatns = applyDocSnap.data();
          console.log("appl", applicatns)
          // await deleteDoc(applyDocRef);
        
        })        

    },

  methods: {

    goBack() {
      this.$router.push("/viewapplicants");
    },      

    async updateJob() {
        const db = getFirestore(firebaseApp);
        const docRef1 = doc(db, "User", getAuth().currentUser.uid);

        const companyName1 = await getDoc(docRef1);
        // console.log("print 281", this.form.internshipTitle, companyName1);
        const companyName = companyName1.data().CompanyName;
        let docName = companyName.concat(" - ", this.form.internshipTitle);
        const docRef = doc(db, "Job", docName);
        const id = getAuth().currentUser.uid;

        const listingName = this.$route.query.jobId;

        this.originalApplicants.forEach(async (id) => {

          console.log(id)

          // remove from student user JobApplied array
          const stuDocRef = doc(db, "User", id);
          // const stuDocSnap = await getDoc(stuDocRef);
          // const applied = stuDocSnap.data()["JobsApplied"];
          // console.log(applied)
          const applicationName = docName.concat(" - ", id)
          await updateDoc(stuDocRef, {
              JobsApplied: arrayRemove(applicationName),
          });

          // remove from application
          const applyDocRef = doc(db, "Application", applicationName);
          await deleteDoc(applyDocRef);
        
        })


        // delete listing from Job
        await deleteDoc(doc(db, "Job", listingName));

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
          CreatedAt: serverTimestamp(),
          DateRange: this.form.daterange,
          Deleted: false,
        };
        try {
          const docRef2 = doc(db, "User", id);
          // insert new data into Job
          await setDoc(docRef, data);

          // remove original title from company user's Jobs array
          await updateDoc(docRef2, {
              Jobs: arrayRemove(this.originalTitle),
          });

          // add new title into company user's Jobs array
          await updateDoc(docRef2, {
            Jobs: arrayUnion(this.form.internshipTitle),
          });

          alertMsg("success", "Internship Updated!");
          this.$router.push("/viewapplicants")
          

        } catch (error) {
          console.error(error);
        }
        return;
    },      

    submitClick() {
      this.$refs.ruleFormRef
        .validate((valid) => {
          if (valid) {
            // console.log("submit!");
            this.updateJob();
          } else {
            // console.log("error submit!");
            return false;
          }
        })
        .catch((e) => {
          console.log(e);
        });
      // submitForm(formEl);
    },
    resetAllFields() {
      this.$refs.ruleFormRef.resetFields();
    },
  },
  components: {
    NavBar,
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap");

h2 {
  font-family: "Poppins";
  text-align: center;
  font-weight: 500;
  color: #1f1d2a;
  margin-top: 2%;
  font-size: 25px;
}

.card {
  margin: 2% 10% 2% 10%;
  align-self: center;

  padding: 30px 50px;
  /* height: max-content; */
  min-height: 500px;
  border-radius: 30px;
  background-color: white;
  justify-content: center; /* align horizontal */
}
#mainContainer {
  width: 80%;
  margin: 2% 10% 2% 10%;
  align-self: center;

  padding-top: 2%;
  /* height: max-content; */
  min-height: 500px;
  border-radius: 30px;
  background-color: white;
  /* position: relative; */
  display: flex;
  justify-content: center; /* align horizontal */
}

#buttonContainer {
  margin-bottom: 40px;
}

.btn-text {
  color: #1f1d2a;
  font-weight: 600;
}
.add-btn {
  width: 100%;
  border: 1px #99a9bf;
}

.el-form {
  /* position: relative; */

  align-items: center;
  /* color: #A5A6F6; */
  size: "large";
  /* width: 90%; */
}

.el-form .el-form-item {
  font-family: "Poppins", sans-serif;
  font-size: 15px;
  font-weight: 500;
  /* width: 90%; */
  text-decoration-color: #a5a6f6;
  size: "large";
}
</style>