<template>

  <bar-chart class="user" width=500px :data = "numOfJob"></bar-chart>
</template>
 
<script>

export default {
  name: "EmployerJobListChart",
  data() {
    return {
      numOfJob: {
        "Data Analyst": '5',
        "Data Engineer": '7',
        "Software Engineer": '10',
        "Data Scientist" : '8',
        "Algorithm Engineer" : '10'
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