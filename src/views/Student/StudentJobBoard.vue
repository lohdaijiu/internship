<template>
    <StudentNav/>

  <el-table :data="tableData" height="250" style="width: 100%">
    <el-table-column prop="companyname" label="Company Name" width="180" />
    <el-table-column prop="jobpos" label="Job Position" width="180" />
    <el-table-column prop="postdate" label="Date Posted" />
    <el-table-column prop="duration" label="Work Duration" />
    <el-table-column prop="yos" label="Year of Study" />
    <el-table-column prop="range" label="Date Range" />

  </el-table>
</template>

<script>
import StudentNav from '../../components/StudentNav.vue'

export default {
    name: 'StudentJobBoard',

    components:{
        StudentNav
    }

    

}
</script>
<script setup>

const tableData = [
  {
    companyname: 'Company ABC',
    jobpos: 'Data Scientist',
    postdate: '21/2/22',
    duration: '3 Months',
    yos: 'Y2, 3, 4',
    range: 'Jul 22 - Dec 23',
  },
    {
    companyname: 'Company XYZ',
    jobpos: 'Software Engineer',
    postdate: '19/2/22',
    duration: '6 Months',
    yos: 'Y3',
    range: 'May 22 - Aug 22',
  },
]


</script>

<style scoped>
/* TODO */


</style>

