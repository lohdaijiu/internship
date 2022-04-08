<template>
  <StudentNav />
  <br />
  <h1>Find Internships</h1>
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
    <el-col :span="3"></el-col>
    <el-col :span="12">
      <el-input
        v-model="keyword"
        size="large"
        placeholder="Search for an internship..."
        :suffix-icon="Search"
        clearable
      />
    </el-col>
    <el-col :span="6" class="search-btn-container">
      <i class="searchicon">
        <el-button type="success" size="large" @click="searchResult()">
          <el-icon style="vertical-align: middle">
            <Search />
          </el-icon>
          <span style="vertical-align: middle"> Search </span>
        </el-button>
      </i>
    </el-col>
    <el-col :span="3"></el-col>
  </el-row>
  <el-row>
    <el-col :span="3"></el-col>
    <el-col :span="3" id="companySelect">
      <el-select
        v-model="companyValue"
        multiple
        collapse-tags
        collapse-tags-tooltip
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
    <el-col :span="3" id="remoteSelect">
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
    <el-col :span="9"></el-col>
  </el-row>

  <el-row class="table-container">
    <el-col :span="3"></el-col>

    <el-col :span="18">
      <el-table
        ref="tableRef"
        :data="queriedData"
        :default-sort="{ prop: 'postdate', order: 'descending' }"
        style="width: 100%"
        max-height="550"
        :table-layout="auto"
        :header-row-style="headerStyle"
        :row-style="dataStyle"
        :header-cell-style="headerCellStyle"
        @row-click="viewListing"
        highlight-current-row="true"
      >
        <!-- @row-click="viewListing(row)" -->

        <el-table-column prop="companyname" label="Company Name" width="180" />
        <el-table-column prop="jobpos" label="Job Position" width="180" />
        <el-table-column
          prop="postdate"
          label="Date Posted"
          sortable
          width="150"
        />
        <el-table-column prop="duration" label="Duration" width="100" />
        <el-table-column prop="yos" label="Year of Study" min-width="190">
        </el-table-column>
        <el-table-column prop="range" label="Date Range" min-width="200" />
        <el-table-column fixed="right" width="110">
          <template #default="scope">
            <el-button
              size="small"
              type="success"
              @click="applyJob(scope.row)"
              v-if="showApply(scope.row)"
              >Apply</el-button
            >
            <!-- <el-button
              size="small"
              @click="viewListing(scope.row)"
              v-if="showApply(scope.row)"
              >Details</el-button
            > -->
            <medium v-if="!showApply(scope.row)">Job applied!</medium>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="3"></el-col>
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
import { alertMsg } from "../../functions/alertMsg";
import {
  getDocs,
  collection,
  getDoc,
  getFirestore,
  doc,
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
      multipleSelection: ref([]),
      headerStyle: {
        color: "#808080",
        "font-family": "Poppins",
        "font-weight": 500,
        "font-size": "14px",
      },
      headerCellStyle: {
        "background-color": "#96C67F",
        color: "#1F1D2A",
        "margin-bottom": "20px ",
      },
      dataStyle: {
        "font-family": "Poppins",
        "font-weight": 300,
        "font-size": "13px",
      },
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
      const {
        jobData,
        keyword,
        workLocation,
        durationValue,
        companyValue,
        value1,
      } = this;

      console.log(value1);
      // console.log(jobData, value1[0].toString().slice(4, 15));

      // const searchStartDate = value1[0].toString().slice(4, 15).slice(4, 6);
      // const searchEndDate = value1[1].toString().slice(4, 15);
      // console.log(searchStartDate, searchEndDate);

      console.log(
        jobData.filter(
          ({ jobpos, worklocation, duration, range, companyname }) =>
            jobpos.toLowerCase().includes(keyword.toLowerCase()) &&
            (workLocation.includes(worklocation) || workLocation.length == 0) &&
            (durationValue.includes(duration) || durationValue.length == 0) &&
            (companyValue.includes(companyname) || companyValue.length == 0) &&
            (value1 == null ||
              this.dateCompare1(
                this.getSearchStartDate(value1),
                this.getStartDate(range)
              )) &&
            (value1 == null ||
              this.dateCompare2(
                this.getSearchEndDate(value1),
                this.getEndDate(range)
              ))
        )
      );
      this.queriedData = jobData.filter(
        ({ jobpos, worklocation, duration, companyname, range }) =>
          jobpos.toLowerCase().includes(keyword.toLowerCase()) &&
          (workLocation.includes(worklocation) || workLocation.length == 0) &&
          (durationValue.includes(duration) || durationValue.length == 0) &&
          (companyValue.includes(companyname) || companyValue.length == 0) &&
          (value1.length === 0 ||
            this.dateCompare1(
              this.getSearchStartDate(value1),
              this.getStartDate(range)
            )) &&
          (value1.length === 0 ||
            this.dateCompare2(
              this.getSearchEndDate(value1),
              this.getEndDate(range)
            ))
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
    async applyJob(x) {
      const notApplied = await this.appliedBoolean(x);
      if (notApplied) {
        const jobName = x.companyname.concat(" - ", x.jobpos);
        this.$router.push({ path: "/applyjob", query: { job: jobName } });
      } else {
        alertMsg("error", "Job already applied");
      }
      // console.log(x);
      //
      // const docRef1 = doc(db, "Job", jobName);
      // const docRef2 = doc(db, "User", id);

      // if (docSnap.exists()) {
      //   alert("You have already applied for this position");
      // } else {
      //   try {
      //     //Add document into application db

      //     const data = {
      //       CreatedAt: serverTimestamp(),
      //       Progress: "Pending",
      //       Applicant: id,
      //       Position: x.jobpos,
      //       Status: "",
      //       CompanyName: x.companyname,
      //     };

      //     await setDoc(docRef, data);
      //     await updateDoc(docRef1, { Applicants: arrayUnion(id) });
      //     await updateDoc(docRef2, {
      //       JobsApplied: arrayUnion(applicationName),
      //     });
      //     alert("Job applied!");
      //   } catch (error) {
      //     alert("There was an error processing the application");
      //     console.log(error);
      //   }
      // }
    },

    showApply(x) {
      const id = getAuth().currentUser.uid;
      return !x.applicants.includes(id);
    },

    async appliedBoolean(x) {
      const db = getFirestore(firebaseApp);
      const id = getAuth().currentUser.uid;
      const applicationName = x.companyname.concat(" - ", x.jobpos, " - ", id);

      const docRef = doc(db, "Application", applicationName);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return false;
      } else {
        return true;
      }
    },

    viewListing(x) {
      // const data = this.getListing(x);
      // console.log(row.innerHTML);
      // this.$emit('viewListing');
      try {
        this.$router.push({
          path: "/viewjoblisting",
          // name: "StudentViewListing",

          // props: {listing: this.ListingData},

          query: { jobId: x.companyname.concat(" - ", x.jobpos) },
        });
      } catch (error) {
        console.log(error);
      }
    },

    // handleSelectionChange(x) {
    //   this.multipleSelection.value = x;
    //   console.log(this.multipleSelection);
    // },
    // isDateSame(x, y) {
    //   return x === y;
    // },

    dateCompare1(x, y) {
      //returns true if x is earlier or same as y
      //convert month into number
      if (x === null) {
        return;
      }
      const monthArr = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      var monthOfX = 0;
      var monthOfY = 0;
      for (var i = 0; i < monthArr.length; i++) {
        if (this.getMonth(x) === monthArr[i]) {
          monthOfX = i + 1;
        }
        if (this.getMonth(y) === monthArr[i]) {
          monthOfY = i + 1;
        }
      }

      if (x === y) {
        //same date
        return true;
      } else if (this.getYear(x) != this.getYear(y)) {
        //different year
        return this.getYear(y) > this.getYear(x);
      } else if (monthOfX != monthOfY) {
        return monthOfY > monthOfX;
      } else {
        return this.getDay(y) > this.getDay(x);
      }
    },

    dateCompare2(x, y) {
      //returns true if x is later or same as y
      //convert month into number
      if (x === null) {
        return;
      }
      const monthArr = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      var monthOfX = 0;
      var monthOfY = 0;
      for (var i = 0; i < monthArr.length; i++) {
        if (this.getMonth(x) === monthArr[i]) {
          monthOfX = i + 1;
        }
        if (this.getMonth(y) === monthArr[i]) {
          monthOfY = i + 1;
        }
      }

      if (x === y) {
        //same date
        return true;
      } else if (this.getYear(x) != this.getYear(y)) {
        //different year
        return this.getYear(y) < this.getYear(x);
      } else if (monthOfX != monthOfY) {
        return monthOfY < monthOfX;
      } else {
        return this.getDay(y) < this.getDay(x);
      }
    },

    getYear(x) {
      return parseInt(x.slice(7, 11));
    },

    getMonth(x) {
      return x.slice(0, 3);
    },

    getDay(x) {
      return parseInt(x.slice(4, 6));
    },

    getStartDate(x) {
      return x.split(" - ")[0];
    },

    getEndDate(x) {
      return x.split(" - ")[1];
    },

    getSearchStartDate(x) {
      if (x.length === 0) {
        return null;
      }
      return x[0].toString().slice(4, 15);
    },

    getSearchEndDate(x) {
      if (x.length === 0) {
        return null;
      }
      return x[1].toString().slice(4, 15);
    },
  },

  async beforeMount() {
    async function getData() {
      if (jobData.length == 0) {
        try {
          const db = getFirestore(firebaseApp);
          const querySnapshot = await getDocs(collection(db, "Job"));
          querySnapshot.forEach((doc) => {
            if (doc.data().Deleted == false) {
              jobData.push({
                companyname: doc.data().CompanyName,
                jobpos: doc.data().InternshipTitle,
                postdate: doc.data().CreatedAt.toDate().toString().slice(4, 15),
                duration: doc.data().Duration,
                yos: doc.data().Year,
                worklocation: doc.data().Type,
                dateRange: doc.data().DateRange,
                applicants: doc.data().Applicants,
                range: doc
                  .data()
                  .DateRange[0].toDate()
                  .toString()
                  .slice(4, 15)
                  .concat(
                    " - ",
                    doc.data().DateRange[1].toDate().toString().slice(4, 15)
                  ),
              });
            }
          });

          console.log("success");
        } catch (error) {
          console.error(error);
        }
      }
    }
    await getData();
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

<style>
#remoteSelect .el-select__tags {
  transform: translateY(-80%) !important;
}
#companySelect .el-select__tags {
  top: 40% !important;
}
h1 {
  font-family: "Poppins";
  text-align: center;
}
</style>
<style>
.el-table_1_column_7 .el-table__cell {
  text-align: center;
}
.el-table .sort-caret.ascending {
  border-bottom-color: #fafafa !important;
}
.el-table .sort-caret.descending {
  border-top-color: #fafafa !important;
}
.el-table .descending .sort-caret.descending {
  border-top-color: #1f1d2a !important;
}
.el-table .ascending .sort-caret.ascending {
  border-bottom-color: #1f1d2a !important;
}
</style>

<style scoped>
.search-container {
  margin-top: 40px;
}
.search-btn-container {
  margin-left: 30px;
}
.table-container {
  margin-top: 40px;
  margin-bottom: 20px;
}
/* >>> .el-table {
  border-collapse: collapse;
}
>>> .el-table tr {
  background-color: #fafafa;
} */
>>> .el-table tr:hover {
  text-decoration: underline;
  /* background-color: #96c67f; */
  color: #96c67f;
  text-decoration-color: #96c67f;
}
</style>
