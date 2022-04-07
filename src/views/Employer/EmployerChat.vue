!<template>
  <NavBar />
  <el-breadcrumb separator="/" class="breadcrumb">
    <el-breadcrumb-item
      :to="{ path: '/employerchatselection' }"
      style="color: #a5a6f6 !important"
      >Select Conversation</el-breadcrumb-item
    >
    <el-breadcrumb-item><a>Message</a></el-breadcrumb-item>
  </el-breadcrumb>
  <Chat id="chat" />
</template>

<script>
import NavBar from "../../components/EmployerNav.vue";
import Chat from "../../components/Chat.vue";
// import { ArrowRight } from "@element-plus/icons-vue";
export default {
  // props: [ArrowRight],
  components: {
    NavBar,
    Chat,
    // ArrowRight,
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600&display=swap");
#chat {
  margin-top: 40px;
}
.breadcrumb {
  font-family: "Poppins";
  margin-top: 20px;
  margin-left: 20px;
  font-weight: 200;
}
</style>