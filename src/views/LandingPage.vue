<template>
  <!-- <el-row>
    <el-col :span="24"><div class="grid-content bg-purple" /></el-col>
  </el-row> -->

  <el-row>
    <el-col :span="2"><div class="grid-content" /></el-col>
    <el-col :span="10">
      <h1 class="text-tag">Sail to startups with internSHIP</h1>
      <el-row
        ><el-col :span="18"
          ><h1 class="text-tag2">
            internSHIP provides a seamless way to connect with each other, and
            start your ideal career path early.
          </h1></el-col
        >
        <el-col :span="6"><div class="grid-content" /></el-col
      ></el-row>
      <el-row
        ><el-col :span="6"
          ><el-button
            @click="redirectToStudentLogin()"
            class="login-btns"
            size="large"
            color="#96C67F"
            value="Students"
            ><p class="btn-text">Students</p></el-button
          ></el-col
        >
        <el-col :span="2"><div class="grid-content" /></el-col>
        <el-col :span="6"
          ><el-button
            @click="redirectToEmployerLogin()"
            class="login-btns"
            size="large"
            color="#A5A6F6"
            value="Students"
            ><p class="btn-text">Employers</p></el-button
          ></el-col
        >
        <el-col :span="10"><div class="grid-content" /></el-col
      ></el-row>
    </el-col>
    <el-col :span="10"
      ><el-image
        style="width: 100%"
        :src="require('../assets/' + url)"
        :fit="fit"
    /></el-col>
    <el-col :span="2"><div class="grid-content" /></el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      fit: "fill",
      url: "business-deal.png",
    };
  },
  methods: {
    redirectToStudentLogin() {
      this.$router.push({ path: "/studentlogin" });
    },
    redirectToEmployerLogin() {
      this.$router.push({ path: "/employerlogin" });
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap");
.btn-text {
  color: #1f1d2a;
  font-weight: 600;
}
.login-btns {
  width: 100%;
}
.text-tag {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  color: #1f1d2a;
  font-size: 42px;
  margin-top: 100px;
}
.text-tag2 {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  color: #9b948e;
  font-size: 18px;
}
.el-row {
  margin-bottom: 20px;
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
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
