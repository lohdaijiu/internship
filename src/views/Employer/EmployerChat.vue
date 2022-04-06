!<template>
  <NavBar />

  <Chat id="chat" />
</template>

<script>
import NavBar from "../../components/EmployerNav.vue";
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
</style>