
<template>
  <NavBar />
  <h1>Create an Internship Listing</h1>
  <el-row>
    <el-col :span="5"></el-col>
    <el-col :span="14">
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
            <el-col :span="10"></el-col>
            <el-col :span="4">
              <el-button
                @click="submitClick()"
                class="add-btn"
                size="large"
                color="#A5A6F6"
                ><p class="btn-text">Create</p>
              </el-button>
            </el-col>
            <el-col :span="10"></el-col>
          </el-form-item>
        </el-form>
      </el-card>

      <!-- <div id="buttonContainer">
        <el-row>
          <el-col :span="10"></el-col>
          <el-col :span="4">
            <el-button
              @click="addJob()"
              class="add-btn"
              size="large"
              color="#A5A6F6"
              ><p class="btn-text">Create</p>
            </el-button>
          </el-col>
          <el-col :span="10"></el-col>
        </el-row>
      </div> -->
    </el-col>
  </el-row>
  <el-col :span="5"></el-col>
</template>

<script>
// @flow
import { getAuth } from "firebase/auth";
import firebaseApp from "../../main.js";
import { getFirestore } from "firebase/firestore";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
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
      message: "Please select Activity zone",
      trigger: "blur",
    },
  ],
  preferredCom: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "blur",
    },
  ],
  year: [
    {
      type: "array",
      required: true,
      message: "Please select at least one activity type",
      trigger: "change",
    },
  ],
  duration: [
    {
      required: true,
      message: "Please select Activity zone",
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
      message: "Please select activity resource",
      trigger: "change",
    },
  ],
  renum: [
    {
      required: true,
      message: "Please input Internship Title",
      trigger: "blur",
    },
  ],
});

export default {
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
    };
  },

  methods: {
    async addJob() {
      const db = getFirestore(firebaseApp);
      const docRef1 = doc(db, "User", getAuth().currentUser.uid);

      const companyName1 = await getDoc(docRef1);
      console.log(this.form.internshipTitle, companyName1);
      const companyName = companyName1.data().CompanyName;
      let docName = companyName.concat(" - ", this.form.internshipTitle);
      const docRef = doc(db, "Job", docName);
      const docSnap = await getDoc(docRef);
      const id = getAuth().currentUser.uid;
      var errorboolean = true;

      // this.$refs.ruleFormRef.validate((valid) => {
      //   this.validStatus = valid;
      // });

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
          CreatedAt: serverTimestamp(),
          DateRange: this.form.daterange,
          Deleted: false,
        };
        // if (this.validStatus == true) {
        //   this.validStatus = false;
        //   console.log("insdie if", this.validStatus);
        try {
          const docRef1 = doc(db, "Job", docName);
          const docRef2 = doc(db, "User", id);
          await setDoc(docRef1, data);
          await updateDoc(docRef2, {
            Jobs: arrayUnion(this.form.internshipTitle),
          });

          alertMsg("success", "Job Created!");
          this.resetAllFields();
        } catch (error) {
          console.error(error);
          errorboolean = false;
        }
        // } else {
        //   alertMsg("error", "Fill up the missing fields");
        // }

        if (!errorboolean) {
          //this.$router.push("/employerhome")
        }
        return;
      } else {
        //same internship title
        alertMsg("warning", "Please choose a new internship title");
        return false;
      }
    },
    submitClick() {
      this.$refs.ruleFormRef
        .validate((valid) => {
          if (valid) {
            console.log("submit!");
            this.addJob();
          } else {
            console.log("error submit!");
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