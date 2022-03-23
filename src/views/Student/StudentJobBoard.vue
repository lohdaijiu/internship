<template>
  <StudentNav />

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
  <el-row class="search-container">
    <el-col :span="2"></el-col>
    <el-col :span="14">
      <el-input
        v-model="keyword"
        size="large"
        placeholder="Search for an internship..."
        :suffix-icon="Search"
      />
    </el-col>
    <el-col :span="6" class="search-btn-container">
      <i class="searchicon">
        <el-button type="primary" size="large">
          <el-icon style="vertical-align: middle">
            <Search />
          </el-icon>
          <span style="vertical-align: middle"> Search </span>
        </el-button>
      </i>
    </el-col>
    <el-col :span="2"></el-col>
  </el-row>

  
  <el-row>
    <el-col :span="2"></el-col>
    <el-col :span="20">
      <el-table
        ref="tableRef"
        :data="jobData"
        :default-sort="{ prop: 'postdate', order: descending }"
        height="250"
        style="width: 100%"
      >
        <el-table-column prop="companyname" label="Company Name" width="180" />
        <el-table-column prop="jobpos" label="Job Position" width="180" />
        <el-table-column prop="postdate" label="Date Posted" sortable />
        <el-table-column prop="duration" label="Work Duration" />
        <el-table-column
          prop="yos"
          label="Year of Study"
          :filters="[
            { text: '1', value: '1' },
            { text: '2', value: '2' },
            { text: '3', value: '3' },
            { text: '4', value: '4' },
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
        </el-table-column>
        <el-table-column prop="range" label="Date Range" />

        <el-table-column >
          <template #default="scope">
             <el-button
          size="small"
          type="success"
          @click="apply(scope.row)"
          >Apply</el-button
        >
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="2"></el-col>
  </el-row>

  <div v-for="(f, index) of searchResult" :key="index">
    <!-- <p>{{ f.companyname }}</p> -->
  </div>
</template>

<script>
// import firebase from "firebase";
// import { computed, onMounted, reactive, ref } from "vue";
// import { computed, ref } from "vue";
import StudentNav from "../../components/StudentNav.vue";
import { Search } from "@element-plus/icons-vue";
import { collection, getDocs, getFirestore, updateDoc, arrayUnion, doc } from "firebase/firestore";
import firebaseApp from "../../main.js";
import { getAuth } from "firebase/auth";

//   // dummy values for frontend

var jobData = [];
  

export default {
  name: "StudentJobBoard",

    

  components: {
    StudentNav,
    Search,
  },

  data() {
    return { keyword: "", jobData };
  },

  computed: {
    searchResult() {
      const { jobData, keyword } = this;
      return jobData.filter(({ companyname }) => companyname.includes(keyword));
    },
  },

  methods: {
    async apply(x) {
      const jobName = x.companyname.concat(" - ", x.jobpos)
      const id = getAuth().currentUser.uid
      const db = getFirestore(firebaseApp);
      const jobWithStatus = {Job: jobName, Status: "Pending"}
      try {
        const docRef1 = doc(db, "Job", jobName);
        const docRef2 = doc(db, "User", id);
        await updateDoc(docRef1, {Applicants : arrayUnion(id)});
        await updateDoc(docRef2, {JobsApplied : arrayUnion(jobWithStatus)});
        alert("Job applied!")
      } catch (error) {
        alert("There was an error processing the application")
        console.log(error)
      }
      
    }
  },

  beforeMount() {
    async function getData() {
      try {
      const db = getFirestore(firebaseApp);
      const querySnapshot =  await getDocs(collection(db, "Job"));
      querySnapshot.forEach((doc) => 
      jobData.push({
      companyname: doc.data().CompanyName,
      jobpos: doc.data().InternshipTitle,
      postdate: doc.data().CreatedAt.toDate().toString().slice(4,15),
      duration: doc.data().Duration,
      yos: doc.data().Year,
      range: doc.data().DateRange[0].toDate().toString().slice(4,15)
      .concat(" - ", doc.data().DateRange[1].toDate().toString().slice(4,15))}))
      console.log(jobData)
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  },
}
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

</script>

<style scoped>
/* TODO */
.search-container {
  margin-top: 40px;
}
.search-btn-container {
  margin-left: 30px;
}
</style>

