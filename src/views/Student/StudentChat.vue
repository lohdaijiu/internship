!<template>
  <NavBar />
  <el-breadcrumb separator="/" class="breadcrumb">
    <el-breadcrumb-item
      :to="{ path: '/studentchatselection' }"
      style="color: #a5a6f6 !important"
      >Select Conversation</el-breadcrumb-item
    >
    <el-breadcrumb-item><a>Message</a></el-breadcrumb-item>
  </el-breadcrumb>
  <Chat id="chat" />
</template>

<script>
import NavBar from "../../components/StudentNav.vue";
import Chat from "../../components/Chat.vue";

export default {
  components: {
    NavBar,
    Chat,
  },
};
</script>

<style scoped>
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