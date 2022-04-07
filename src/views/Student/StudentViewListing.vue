<template>
  <div>
    <StudentNav />



    <el-row id="general_info">
      <el-col :span="6"></el-col> 
      <!-- <el-col :span="10" id="name_col">
           
        <h2 onclick="seeEmployer()">{{ company_name }}</h2>
      </el-col> -->
      <el-col :span="12" id="viewbtn_container">
        <el-button id="viewbtn" type="text" @click="seeEmployer()">{{ company_name }}</el-button>
      </el-col>      
      <el-col :span="6"></el-col> 
    </el-row>
    
    <div id="general_info2">
      <h3>{{ job_title }}</h3>
    </div>

    <el-row class="table-container">
      <el-col :span="4"></el-col>
      <el-col :span="16">
        <el-table
          ref="tableRef"
          :data="tableData"
          style="width: 100%"
          :header-row-style="headerStyle"
          :row-style="dataStyle"
          :header-cell-style="headerCellStyle"
        >
          <el-table-column prop="yos" label="Year of Study" />
          <el-table-column prop="duration" label="Duration" />
          <el-table-column prop="compensation" label="Compensation" />
          <el-table-column prop="range" label="Date Range" />
          <el-table-column prop="postdate" label="Date Posted">
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>

    <!-- Full Description -->
    <div class="details" align="center">
      <div class="tabbable" align="left">
        <!-- Tabs -->
        <el-tabs tab-position="top" stretch="true">
          <el-tab-pane label="Job Description">
            {{ job_descr }}
          </el-tab-pane>
          <el-tab-pane label="Technical Competencies">
            {{ tech_compet }}
          </el-tab-pane>
          <el-tab-pane label="Location">
            {{ location }}
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>


    <el-row>
      <el-col :span="18"></el-col>  

    <!--  APPLY  -->
    <el-col :span="2" class="apply-btn-container">
      <el-button id="applybtn" type="success" @click="apply()">Apply</el-button>
    </el-col>
      <!-- <el-col :span="2"></el-col> -->
    <el-col :span="2" class="apply-btn-container">
    <el-button id ='backbtn' type="info" @click='goBack'>Back</el-button>
    </el-col>
      <el-col :span="2"></el-col>  
    
    </el-row>
  </div>
  <!-- </div> -->
</template>


<script>
import StudentNav from "../../components/StudentNav.vue";
import firebaseApp from "../../main.js";
import { getFirestore } from "firebase/firestore";
import { getDoc, doc } from "firebase/firestore";
var listingName = "";
var listingData = [];
var tableData = [];
var onlyListing = [];
export default {
  name: "StudentViewListing",
  components: {
    StudentNav,
  },
  data() {
    return {
      listingData,
      listingName,
      tableData,
      job_title: "",
      job_descr: "",
      tech_compet: "",
      location: "",
      company_name: "",
      companyuid : "",
      onlyListing,
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
  methods: {
    goBack() {
      this.$router.go(-1)
    },    
    async apply() {
      this.$router.push({
        path: "/applyjob",
        query: { job: this.$route.query.jobId },
      });
    },
    seeEmployer() {
      this.$router.push({
        path: "/viewemployerprofile",
        query: {id : this.companyuid}
      })
    }
  },
  async created() {
    // console.log('Query: ', this.$route.query.jobId);
    listingName = this.$route.query.jobId;
    listingData = [];
    console.log("getting listing");
    const db = getFirestore(firebaseApp);
    const docName = listingName;
    console.log(docName);
    const docRef = doc(db, "Job", docName);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("exists");
      try {
        this.companyuid = docSnap.data().Companyuid
        // console.log(docSnap.data().CompanyName)
        listingData.push({
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
          competency: docSnap.data().PreferredCompetencies,
        });
        console.log(listingData);
        console.log(listingData[0]["competency"]);
        tableData = [];
        onlyListing = Object.entries(listingData[0]).map((e) => ({
          [e[0]]: e[1],
        }));
        console.log(onlyListing);
        this.tableData.push({
          yos: onlyListing[4]["yos"],
          duration: onlyListing[3]["duration"],
          compensation: onlyListing[7]["compensation"],
          postdate: onlyListing[2]["postdate"],
          range: onlyListing[6]["range"],
        });
        // console.log(tableData[0])
        // return ListingData;
      } catch (error) {
        console.log(error);
      }
    }
    this.job_descr = listingData[0]["description"];
    this.job_title = listingData[0]["jobpos"];
    this.tech_compet = listingData[0]["competency"];
    this.location = listingData[0]["worklocation"];
    this.company_name = listingData[0]["companyname"];
  },
};
</script>

<style scoped>
#general_info, #general_info1, #general_info2 {
  font-family: "Poppins";
  text-align: center;
}
#viewbtn_container {
  text-align: center;
  align-content: center;
}
#viewbtn {
  font-family: "Poppins";  
  /* border-radius: 10px; */
  margin-top: 25px;
  margin-left: 10px;
  text-align: center;
  font-weight: bold;
  color: #0e2503;
  size: 100%;
  font-size: 25px;
  transition: color 0.1s;
  text-decoration: underline;  

}

#viewbtn:hover {
  text-decoration: underline;
  color: #96c67f;
}
.table-container {
  margin-top: 40px;
  margin-bottom: 40px;
}
.tabbable {
  width: 80%;
  align-content: center;
  margin-left: 20px;
  margin-right: 20px;
  position: middle;
  margin-bottom: 50px;
  font-family: "Poppins";
}
.tabbable .el-tabs .el-tab-pane label {
  color: #96c67f;
}
.apply-btn-container {
  justify-content: space-evenly;
  /* margin-left: 73.5%; */
  padding-right: 3%;
  min-height: 200px;
  float: right;
  justify-content: flex-end;
}
#applybtn, #backbtn {
  border-radius: 5px;
  text-align: center;
  size: large;
  /* margin-right: 40px; */
  /* font-weight: bold; */
  /* border-style: solid; */
  /* justify-content: flex-end;
  float: right; */
}

/* .el-table { */
  /* :deep(.el-table__header tr {
    color: #96c67f;
  }) */
>>> .el-table__header tr {
  color: #96c67f;
}
/* } */
</style>