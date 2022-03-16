<template>
    <StudentNav/>

  <!-- <div class="searchbar" style="width: 100%">
    <input type="text" placeholder="Search for an internship..." v-model="searchQuery"/>
    <i class="searchicon">
        <el-button type="primary">
          <el-icon style="vertical-align: middle">
            <search />
          </el-icon>
          <span style="vertical-align: middle"> Search </span>
        </el-button>
    </i>
  </div> -->

  <div>
    <input v-model="keyword" placeholder="Search for an internship..." />
        <i class="searchicon">
        <el-button type="primary">
          <el-icon style="vertical-align: middle">
            <search />
          </el-icon>
          <span style="vertical-align: middle"> Search </span>
        </el-button>
    </i>
    <div v-for="(f, index) of searchResult" :key="index">

      <!-- <p>{{ f.companyname }}</p> -->
    </div>
  </div>

  <el-table ref="tableRef" 
    :data="jobData" 
    :default-sort="{ prop: 'postdate', order: descending}"
    height="250" 
    style="width: 100%">
    <el-table-column prop="companyname" label="Company Name" width="180" />
    <el-table-column prop="jobpos" label="Job Position" width="180" />
    <el-table-column 
      prop="postdate" 
      label="Date Posted"
      sortable
    />
    <el-table-column prop="duration" label="Work Duration" />
    <el-table-column 
      prop="yos" 
      label="Year of Study" 
      :filters="[
      {text: '1', value: '1'},
      {text: '2', value: '2'},
      {text: '3', value: '3'},
      {text: '4', value: '4'},
      ]"
      :filter-method="filterTag"
      filter-placement="bottom-end"
      >
    </el-table-column>

    <el-table-column prop="range" label="Date Range" />

  </el-table>
</template>

<script>
// import firebase from "firebase";
// import { computed, onMounted, reactive, ref } from "vue";
// import { computed, ref } from "vue";
import StudentNav from '../../components/StudentNav.vue'

    //   // dummy values for frontend

    const jobData = [
      {
        companyname: 'Company ABC',
        jobpos: 'Data Scientist',
        postdate: '21/2/22',
        duration: '3 Months',
        yos: '2 3 4',
        range: 'Jul 22 - Dec 23',
      },
        {
        companyname: 'Company XYZ',
        jobpos: 'Software Engineer',
        postdate: '19/2/22',
        duration: '6 Months',
        yos: '3',
        range: 'May 22 - Aug 22',
      },
    ];

export default {

  
    name: 'StudentJobBoard',

    components:{
        StudentNav
    },

    data() {
      return {keyword: "", jobData};
    },

      computed: {
        searchResult() {
          const {jobData, keyword} = this;
          return jobData.filter(({companyname}) => companyname.includes(keyword));
        },
      },
    // setup() {

    //   const searchQuery = ref("");

    //   computed: {
    //     searchResult() {
    //       const {jobData, keyword} = this;
    //       return jobData.filter(({companyname}) => companyname.includes(keyword));
    //     },
    //   },

      // const searchResult = computed(() => {
      //   return jobData.value.filter(    
      //     (data) =>
      //       !searchQuery.value ||
      //       data.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      //     );
      //   });


//       return {searchResult, searchQuery};
//     },


}
</script>

<style scoped>
/* TODO */


</style>

