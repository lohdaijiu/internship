<template>
  <pie-chart class="user" width=500px :data = "chartData"></pie-chart>
</template>
 
<script>

export default {
  name: "StudentJpbTypeChart",
  data() {
    return {
      chartData: {
        "Data Analyst": '65%',
        "Software Engineer": '35%'
      } 
      }
}}
</script>

<style scoped>
.user{
  margin: auto;
  border: 3px solid grey;
}
</style>