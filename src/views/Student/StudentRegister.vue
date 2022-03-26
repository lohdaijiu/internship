// 96C67F
<template>
  <el-container>
    <el-header>
      <el-row class="header-row">
        <el-col :span="4" class="col-brand"
          ><el-image
            style="height: 100%"
            :src="require('../../assets/' + brand_url)"
            :fit="fit"
        /></el-col>
        <el-col :span="16" class
          ><p class="header-brand">
            Take a step towards your future career
          </p></el-col
        >
        <el-col :span="3" class
          ><el-button
            @click="redirectToStudentLogin()"
            class="login-btns"
            size="large"
            color="#96C67F"
            value="Students"
            ><p class="btn-text">Log In</p></el-button
          ></el-col
        >
        <el-col :span="1" class></el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="24"><div class="grid-content" /></el-col>
      </el-row>
      <el-row>
        <el-col :span="7"></el-col>
        <el-col :span="10">
          <el-form :model="form" label-width="160px">
            <el-form-item label="Full Name" class="input-labels">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="Place of Study" class="input-labels">
              <el-input v-model="form.pos" />
            </el-form-item>
            <el-form-item label="Major" class="input-labels">
              <el-input v-model="form.major" />
            </el-form-item>
            <el-form-item label="Email Address" class="input-labels">
              <el-input v-model="form.email" />
            </el-form-item>
            <el-form-item label="Password" class="input-labels">
              <el-input v-model="form.password" type="password" show-password />
            </el-form-item>
            <el-form-item label="Confirm Password" class="input-labels">
              <el-input
                v-model="form.password1"
                type="password"
                show-password
              />
            </el-form-item>
            <el-row>
              <el-col :span="8"></el-col>
              <el-col :span="8">
                <el-button
                  @click="register()"
                  class="register-btns"
                  size="large"
                  color="#96C67F"
                  ><p class="btn-text">Register</p></el-button
                >
              </el-col>
              <el-col :span="8"></el-col>
            </el-row>
          </el-form>
        </el-col>
        <el-col :span="7"></el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../../main.js";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { reactive } from "vue";
export default {
  data() {
    return {
      brand_url: "brand-black.png",
      fit: "fill",
      form: reactive({
        name: "",
        pos: "",
        major: "",
        email: "",
        password: "",
        password1: "",
      }),
      email: "",
      password: "",
      password1: "",
      error: "",
      major: "",
      name: "",
      pos: "",
      resumeURL: "",
      photoURL:
        "https://firebasestorage.googleapis.com/v0/b/internship-433c3.appspot.com/o/profile%2Fblank-pic.jpg?alt=media&token=730520eb-c8c6-4345-83d5-807015471610",
      profileData: [
        { About: "" },
        { "Work Experience": "" },
        { "Skills and Competencies": "" },
        { "Career Interests": "" },
        { Projects: "" },
      ],
    };
  },
  methods: {
    redirectToStudentLogin() {
      this.$router.push({ path: "/studentlogin" });
    },
    async register() {
      if (this.form.password != this.form.password1) {
        alert("Password is different");
        return;
      }

      if (
        this.form.email == "" ||
        this.form.password == "" ||
        this.form.password1 == "" ||
        this.form.major == "" ||
        this.form.name == "" ||
        this.form.pos == ""
      ) {
        alert("Please fill in all the blanks");
        return;
      }

      const auth = getAuth();
      const db = getFirestore(firebaseApp);
      let status = true;

      await createUserWithEmailAndPassword(
        auth,
        this.form.email,
        this.form.password
      ).catch((error) => {
        alert(error.message);
        status = false;
      });

      if (status) {
        const uid = auth.currentUser.uid;
        try {
          const docRef = setDoc(doc(db, "User", uid), {
            Email: this.form.email,
            Major: this.form.major,
            Name: this.form.name,
            PlaceOfStudy: this.form.pos,
            photoURL: this.photoURL,
            resumeURL: this.resumeURL,
            ProfileData: this.profileData,
            Employer: false,
            JobsApplied: [],
          });
          console.log(docRef);
        } catch (error) {
          console.error(error);
        }
        this.$router.push("/studentlogin");
      }
    },
  },
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
.col-brand {
  height: 30px;
  margin-top: auto;
  margin-bottom: auto;
}
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