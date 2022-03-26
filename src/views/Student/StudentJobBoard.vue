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
        <el-button type="primary" size="large" @click="searchResult()">
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
    <el-col :span="3" id="companySelect">
      <el-select
        v-model="companyValue"
        multiple
        filterable
        remote
        reserve-keyword
        placeholder="Company Name"
        :remote-method="remoteMethod"
        :loading="loading"
        size="large"
      >
        <el-option
          v-for="item in options1"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-col>
    <el-col :span="3" id="remoteSelect">
      <el-select
        multiple
        collapse-tags
        collapse-tags-tooltip
        v-model="workLocation"
        placeholder="On-site/Remote"
        size="large"
      >
        <el-option
          v-for="item in workLocationOpt"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-col>
    <el-col :span="3">
      <el-select
        multiple
        collapse-tags
        collapse-tags-tooltip
        v-model="durationValue"
        class="m-2"
        placeholder="Duration"
        size="large"
      >
        <el-option
          v-for="item in durationOpt"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-col>
    <el-col :span="3">
      <el-date-picker
        v-model="value1"
        type="daterange"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
        size="large"
        format="DD/MM/YYYY"
      />
    </el-col>
    <el-col :span="10"></el-col>
  </el-row>

  <el-row class="table-container">
    <el-col :span="2"></el-col>
    <el-col :span="20">
      <el-table
        ref="tableRef"
        :data="queriedData"
        :default-sort="{ prop: 'postdate', order: descending }"
        height="250"
        style="width: 100%"

      >
              <!-- @row-click="viewListing(row)" -->

        <el-table-column prop="companyname" label="Company Name" width="180" />
        <el-table-column prop="jobpos" label="Job Position" width="180" />
        <el-table-column prop="postdate" label="Date Posted" sortable />
        <el-table-column prop="duration" label="Work Duration" />
        <el-table-column prop="yos" label="Year of Study"> </el-table-column>
        <el-table-column prop="range" label="Date Range" />

        <el-table-column>
          <template #default="scope">
            <el-button size="small" type="success" @click="apply(scope.row)"
              >Apply</el-button
            >
          </template>
        </el-table-column>

        <el-table-column>
          <template #default="scope">
            <el-button size="small" type="success" @click="viewListing(scope.row)"
              >Details</el-button
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
// import StudentViewListing from '@/views/Student/StudentViewListing.vue';


import StudentNav from "../../components/StudentNav.vue";
import { Search } from "@element-plus/icons-vue";
import { ref } from "vue";
import {
  getDocs,
  setDoc,
  collection,
  getDoc,
  getFirestore,
  updateDoc,
  arrayUnion,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import firebaseApp from "../../main.js";
import { getAuth } from "firebase/auth";
const value1 = ref([]);
//   // dummy values for frontend
const options = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
];
const workLocationOpt = [
  {
    value: "On-site",
    label: "On-site",
  },
  {
    value: "Remote",
    label: "Remote",
  },
];
const durationOpt = [
  {
    value: "3",
    label: "3",
  },
  {
    value: "6",
    label: "6",
  },
];
var jobData = [];
var queriedData = [];
var companyNameData = ref([]);
var options1 = ref([]);
var loading = ref(false);

var ListingData = [];

export default {
  name: "StudentJobBoard",

  components: {
    StudentNav,
    Search,
  },

  data() {
    return {
      keyword: "",
      workLocation: ref([]),
      durationValue: ref([]),
      jobData,
      options,
      queriedData,
      workLocationOpt,
      ListingData,
      durationOpt,
      value1,
      companyNameData,
      companyValue: ref([]),
      options1,
      loading,
    };
  },

  computed: {},

  methods: {
    // populateQueriedData() {
    //   const { jobData } = this;
    // },
    remoteMethod(query) {
      if (query) {
        loading.value = true;
        setTimeout(() => {
          loading.value = false;
          options1.value = companyNameData.value.filter((item) => {
            return item.toLowerCase().includes(query.toLowerCase());
          });
        }, 200);
      } else {
        options.value = [];
      }
    },
    searchResult() {
      const { jobData, keyword, workLocation, durationValue, companyValue } =
        this;
      console.log(jobData, keyword);

      console.log(
        jobData.filter(
          ({ jobpos, worklocation, duration, companyname }) =>
            jobpos.toLowerCase().includes(keyword.toLowerCase()) &&
            (workLocation.includes(worklocation) || workLocation.length == 0) &&
            (durationValue.includes(duration) || durationValue.length == 0) &&
            (companyValue.includes(companyname) || companyValue.length == 0)
        )
      );
      this.queriedData = jobData.filter(
        ({ jobpos, worklocation, duration, companyname }) =>
          jobpos.toLowerCase().includes(keyword.toLowerCase()) &&
          (workLocation.includes(worklocation) || workLocation.length == 0) &&
          (durationValue.includes(duration) || durationValue.length == 0) &&
          (companyValue.includes(companyname) || companyValue.length == 0)
      );
    },
    // async getStudentName() {
    //   const db = getFirestore(firebaseApp);
    //   if (getAuth().currentUser == null) {
    //     return null;
    //   }
    //   const docRef = doc(db, "User", getAuth().currentUser.uid);
    //   const docSnap = await getDoc(docRef);

    //   try {
    //     return docSnap.data().Name;
    //   } catch {
    //     console.log("error")
    //   }
    // },
    async apply(x) {
      console.log(x);
      const db = getFirestore(firebaseApp);
      const id = getAuth().currentUser.uid;
      const applicationName = x.companyname.concat(" - ", x.jobpos, " - ", id);
      const jobName = x.companyname.concat(" - ", x.jobpos);
      const docRef = doc(db, "Application", applicationName);
      const docSnap = await getDoc(docRef);
      const docRef1 = doc(db, "Job", jobName);
      const docRef2 = doc(db, "User", id);

      if (docSnap.exists()) {
        alert("You have already applied for this position");
      } else {
        try {
          //Add document into application db

          const data = {
            CreatedAt: serverTimestamp(),
            Progress: "Pending",
            Applicant: id,
            Position: x.jobpos,
            Status: "",
            CompanyName: x.companyname,
          };

          await setDoc(docRef, data);
          await updateDoc(docRef1, { Applicants: arrayUnion(id) });
          await updateDoc(docRef2, {
            JobsApplied: arrayUnion(applicationName),
          });
          alert("Job applied!");
        } catch (error) {
          alert("There was an error processing the application");
          console.log(error);
        }
      }
    },

    async getListing(x) {

      // console.log("the listing" + x);
      console.log("getting listing")
      const db = getFirestore(firebaseApp);
      // const id = getAuth().currentUser.uid;
      // const docName = x[0].concat(x[1])
      const docName = x.companyname.concat(" - ", x.jobpos)
      const docRef = doc(db, "Job", docName);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("exists")
        try {
          // console.log(docSnap.data().CompanyName)
          const ListingData = {
            companyname: docSnap.data().CompanyName,
            jobpos: docSnap.data().InternshipTitle,
            postdate: docSnap.data().CreatedAt.toDate().toString().slice(4, 15),
            duration: docSnap.data().Duration,
            yos: docSnap.data().Year,
            worklocation: docSnap.data().Type,
            range: docSnap
              .data()
              .DateRange[0].toDate()
              .toString()
              .slice(4, 15)
              .concat(
                " - ",
                docSnap.data().DateRange[1].toDate().toString().slice(4, 15)
              ),
            compensation: docSnap.data().Renumeration,
            description: docSnap.data().JobDescription,
            competency: docSnap.data().PreferredCompetencies
            
          }
          return ListingData;
        } catch (error) {
          console.log(error)
        }  
      }
    },

    viewListing(x) {
      const data = this.getListing(x);
      // console.log(row.innerHTML);
      // this.$emit('viewListing');
      try{

        this.$router.push({ 
          // path: "/viewjoblisting"
          name: "StudentViewListing",
         

          // props: {listing: this.ListingData},

          params: {listing: data}
                            });

      } catch (error) {
        console.log(error)
      }
    }
  },

  async beforeMount() {
    async function getData() {
      try {
        const db = getFirestore(firebaseApp);
        const querySnapshot = await getDocs(collection(db, "Job"));
        querySnapshot.forEach((doc) =>
          jobData.push({
            companyname: doc.data().CompanyName,
            jobpos: doc.data().InternshipTitle,
            postdate: doc.data().CreatedAt.toDate().toString().slice(4, 15),
            duration: doc.data().Duration,
            yos: doc.data().Year,
            worklocation: doc.data().Type,
            dateRange: doc.data().DateRange,
            range: doc
              .data()
              .DateRange[0].toDate()
              .toString()
              .slice(4, 15)
              .concat(
                " - ",
                doc.data().DateRange[1].toDate().toString().slice(4, 15)
              ),
          })
        );

        console.log("success");
      } catch (error) {
        console.error(error);
      }
    }
    await getData();

    console.log("hello");

    this.queriedData = jobData;
    this.companyNameData = this.queriedData
      .map((item) => item.companyname)
      .filter((value, index, self) => self.indexOf(value) === index);
    console.log(this.companyNameData);
  },

  mounted() {
    // const array1 = [1, 4, 9, 16];/
    // pass a function to map
    // const map1 = queriedData.map((x) => x  .duration);
    // console.log(map1);
    // console.log(nameArray );
  },
};
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
.table-container {
  margin-top: 40px;
}
</style>
<style>
#remoteSelect .el-select__tags {
  transform: translateY(-80%) !important;
}
#companySelect .el-select__tags {
  top: 40% !important;
}
</style>

