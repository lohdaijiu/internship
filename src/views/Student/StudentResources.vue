<template>
  <StudentNav />
  <br />
  <h1>Internship Resources</h1>
  <el-container class="container">
    <el-main class="container-main">
      <!-- <h1>resources</h1> -->
      <el-row class="top-row">
        <el-col :span="6"> </el-col>
        <el-col :span="12">
          <el-card class="card" shadow="hover">
            <el-row class="card-body-row">
              <el-col :span="8" class="card-left-container">
                <span class="helper"></span>
                <el-image
                  class="card-image"
                  :src="require('../../assets/' + url)"
                  :fit="fit"
                />
              </el-col>

              <el-col :span="16" class="card-right-container">
                <h3 class="card-title">
                  How to stand out in a competitive job market
                </h3>
                <p class="card-text">
                  The VMock SMART resume platform will analyze your Resume from
                  EVERY possible angle and help you arrive at a perfect version
                  of yourself!
                </p>
                <p class="card-text">
                  VMock's algorithm helps you to create an impressive resume
                  that can wow the ai resume screening softwares used.
                </p>
                <el-link
                  class="card-link"
                  href="https://www.vmock.com/"
                  target="_blank"
                  type="primary"
                  >Find out more</el-link
                >
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="6"> </el-col>
      </el-row>
      <el-row>
        <el-col :span="6"> </el-col>
        <el-col :span="12">
          <el-card class="card" shadow="hover">
            <el-row class="card-body-row">
              <el-col :span="8" class="card-left-container">
                <span class="helper"></span>
                <el-image
                  class="card-image"
                  :src="require('../../assets/' + cover_url)"
                  :fit="fit"
                />
              </el-col>

              <el-col :span="16" class="card-right-container">
                <h3 class="card-title">Level up your cover letter</h3>
                <p class="card-text">
                  A winning cover letter, along with your resume, can boost your
                  chances of landing an interview for your dream job.
                </p>
                <p class="card-text">
                  When skilfully crafted, it showcases your personality and
                  explains how and why you are a great fit for the job –
                  something a resume alone might not do.
                </p>
                <el-link
                  class="card-link"
                  href="https://nus.edu.sg/cfg/students/career-resources/cover-letter"
                  target="_blank"
                  type="primary"
                  >Find out more</el-link
                >
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="6"> </el-col>
      </el-row>
      <el-row>
        <el-col :span="6"> </el-col>
        <el-col :span="12">
          <el-card class="card" shadow="hover">
            <el-row class="card-body-row">
              <el-col :span="8" class="card-left-container">
                <span class="helper"></span>
                <el-image
                  class="card-image"
                  :src="require('../../assets/' + interview_url)"
                  :fit="fit"
                />
              </el-col>

              <el-col :span="16" class="card-right-container">
                <h3 class="card-title">Interviews are the key to success</h3>
                <p class="card-text">
                  A job interview is an opportunity for the employer to evaluate
                  your skills, personal motivations, interest in their work and
                  your fit for their organisation. At the same time, it is an
                  opportunity for you to determine if the job aligns with your
                  interest and goals
                </p>
                <p class="card-text">
                  To showcase the best version of yourself, it is important to
                  go into an interview well prepared.
                </p>
                <el-link
                  class="card-link"
                  href="https://nus.edu.sg/cfg/students/career-resources/interview/ace-your-job-interviews"
                  target="_blank"
                  type="primary"
                  >Find out more</el-link
                >
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="6"> </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import StudentNav from "../../components/StudentNav.vue";
import { ref } from "vue";

const fill = ref(true);
export default {
  name: "StudentResources",

  components: {
    StudentNav,
  },
  data() {
    return {
      fit: "cover",
      fill,
      url: "vmock-logo.jpg",
      cover_url: "cover-letter.svg",
      interview_url: "interview.svg",
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600&display=swap");
h1 {
  font-family: "Poppins";
  text-align: center;
}
.card-link {
  font-family: "Poppins", sans-serif;

  font-size: 12px;
}
.top-row {
  margin-top: 20px;
}
.helper {
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.card-right-container {
  padding: 20px 30px;
}
.card-left-container {
  height: 300px;
  text-align: center;
}
.card {
  height: 300px;
}
.card-body-row {
  /* height: inherit; */
  height: 300px;
}
.box-card {
  height: 300px;
  align-content: center;
}
.card-image {
  /* width: 250px;   */
  /* height: 250px; */
  /* margin: 0 auto; */
  /* margin-left: auto;
  margin-right: auto; */
  height: 80%;
  vertical-align: middle;
  /* height: 200px; */
}
.card-text {
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  font-weight: 300;
}
.card-title {
  font-family: "Poppins", sans-serif;
}
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.container {
  background-color: #fafafa;
  width: 100%;
  min-height: 100vh;
}
.container-main {
  padding: 0px;
}
</style>
<style>
.el-card__body {
  height: inherit;
  padding: 0 !important;
}
</style>