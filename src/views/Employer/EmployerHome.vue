<template>
  <EmployerNav />
  <!-- <br /> -->
  <!-- <div class="stats-container"> -->
  <EmployerHome />
  <!-- </div> -->
</template>

<script>
import EmployerNav from "../../components/EmployerNav.vue";
import EmployerHome from "../../components/EmployerHome.vue";

export default {
  name: "App",

  mounted() {},

  methods: {},

  components: {
    EmployerNav,
    EmployerHome,
  },
};
</script>

<style scoped>
.stats-container {
  margin: 50px;
}
</style>

