<template>
  <router-view />
</template>

<script>
// import { Search } from "@element-plus/icons-vue";
export default {
  name: "App",
  components: {
    // Search,
  },
};
</script>

<style>
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 15px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
body,
html {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
  background-color: rgb(230, 240, 248);
}
#app {
  min-height: 100vh;
}
</style>
