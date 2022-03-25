<template>

  <pie-chart class="user" width=500px :data = "companyDistri"></pie-chart>
</template>
 
<script>

export default {
  name: "StudentCompDistributionChart",
  data() {
    return {
      companyDistri: {
        "Grab": '25%',
        "Shopee": '25%',
        "Facebook": '25%',
        "Google" : '25%'
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