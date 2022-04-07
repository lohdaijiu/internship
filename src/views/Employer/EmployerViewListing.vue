<template>
  <EmployerNav />
  <el-row>
    <!-- <el-col :span="2"><div class="grid-content" /></el-col> -->
    <el-col :span="12">
      <div id="general_info">
        <h3>{{ job_title }}</h3>
      </div>
    </el-col>
    <el-col :span="6"><div class="grid-content" /></el-col>

    <!-- Edit & Delete Listing -->

    <el-col :span="2" class="editcol"
      ><el-button id="editbtn" @click="editJob()" color="#A5A6F6" type="primary"
        ><p class="btn-text">Edit</p></el-button
      ></el-col
    >
    <!-- <el-col :span="2"><div class="grid-content" /></el-col> -->
    <el-col :span="2" class="deletecol"
      ><el-button id="deletebtn" @click="deleteJob()" type="danger"
        ><p class="btn-text">Delete</p></el-button
      ></el-col
    >
    <el-col :span="2"><div class="grid-content" /></el-col>
  </el-row>

  <el-row id="table-container">
    <el-col :span="4"></el-col>
    <el-col :span="16">
      <el-table
        ref="tableRef"
        :data="tableData"
        style="width: 100%"
        default-expand-all
        :header-row-style="headerStyle"
        :row-style="dataStyle"
        :header-cell-style="headerCellStyle"
      >
        <el-table-column prop="yos" label="Year of Study" />
        <el-table-column prop="duration" label="Duration" />
        <el-table-column prop="compensation" label="Compensation" />
        <el-table-column prop="range" label="Date Range" />
        <el-table-column prop="postdate" label="Date Posted" />
      </el-table>
    </el-col>
    <el-col :span="4"></el-col>
  </el-row>

  <!-- Full Description -->
  <div id="details">
    <div class="tabbable" align="left">
      <!-- Tabs -->
      <el-tabs tab-position="left" stretch>
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
</template>

<script>
import EmployerNav from "../../components/EmployerNav.vue";
import firebaseApp from "../../main.js";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { alertMsg } from "../../functions/alertMsg";


var listingName = "";
var listingData = [];
var tableData = [];
var onlyListing = [];

export default {
  name: "EmployerViewListing",

  components: {
    EmployerNav,
  },

  data() {
    return {
      listingName,
      listingData,
      onlyListing,
      tableData,
      job_title: "",
      job_descr: "",
      tech_compet: "",
      location: "",
      headerStyle: {
        color: "#808080",
        "font-family": "Poppins",
        "font-weight": 500,
        "font-size": "14px",
      },
      headerCellStyle: {
        "background-color": "#a5a6f6 ",
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
    editJob() {
        alertMsg("warning", "Please note that editing a listing will result in loss of all applicants");
      
      // console.log("Pass to edit", this.$route.query.jobId)
      this.$router.push({
          path: "/editlisting",

          query: { jobId: this.$route.query.jobId },
        });
    },

    async deleteJob(x) {
      const id = getAuth().currentUser.uid;
      const db = getFirestore(firebaseApp);
      const docRef = doc(db, "User", id);
      const docSnap = await getDoc(docRef);
      const employerName = docSnap.data().CompanyName;
      const currDeletion = docSnap.data().NumberOfDeletion;
      const docName = employerName.concat(" - ", x.title);

      await updateDoc(docRef, {
        NumberOfDeletion: currDeletion + 1,
      });

      await updateDoc(doc(db, "Job", docName), {
        Deleted: true,
      });
    },
  },

  async created() {
    console.log("Query: ", this.$route.query.jobId);
    listingName = this.$route.query.jobId;

    listingData = [];
    const db = getFirestore(firebaseApp);

    const docName = listingName;
    const docRef = doc(db, "Job", docName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("exists");
      try {
        listingData.push({
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

        tableData = [];

        onlyListing = Object.entries(listingData[0]).map((e) => ({
          [e[0]]: e[1],
        }));
        console.log(onlyListing);
        this.tableData.push({
          yos: onlyListing[3]["yos"],
          duration: onlyListing[2]["duration"],
          compensation: onlyListing[6]["compensation"],
          postdate: onlyListing[1]["postdate"],
          range: onlyListing[5]["range"],
        });
      } catch (error) {
        console.log(error);
      }
    }

    this.job_descr = listingData[0]["description"];
    this.job_title = listingData[0]["jobpos"];
    this.tech_compet = listingData[0]["competency"];
    this.location = listingData[0]["worklocation"];
  },
};
</script>

<style scoped>
#general_info,
#details,
#table-container {
  font-family: "Poppins";
  text-align: center;
}

#table-container,
#details {
  margin: 40px 20px 40px 20px;
}

.tabbable {
  width: 80%;
  align-content: center;
  margin-left: 20px;
  margin-right: 20px;
  position: middle;
  margin-bottom: 50px;
}

.editcol {
  position: relative;
  margin-top: 10px;
  width: 15%;
}
.deletecol {
  position: relative;
  margin-top: 10px;

  width: 15%;
}

#editbtn,
#deletebtn {
  border-radius: 10px;
  text-align: center;

  font-weight: bold;
  border-style: solid;
  width: 75%;
}

>>> .el-table__header tr {
  color: #a5a6f6;
}
/* 
    #editbtn:hover {

        background-color: #D4D381;

    } */
</style>
