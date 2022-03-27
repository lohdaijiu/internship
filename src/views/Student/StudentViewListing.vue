<template>
<div>
    <StudentNav/>       

    <div id="general_info">

        <h3> {{job_title}}</h3>
        <el-image
            class="company-profile"
            :src="require('../../assets/' + url)"
        />
        <br>
        <br>

    </div>

    <el-row class="table-container">
        <el-col :span="2"></el-col>
        <el-col :span="20">
        <el-table
            ref="tableRef"
            :data="clickedListingData"
            height="100"
            style="width: 100%"
        >
            <el-table-column prop="yos" label="Year of Study"/>
            <el-table-column prop="duration" label="Work Duration"/>
            <el-table-column prop="loc" label="Remote/On-site" />
            <el-table-column prop="pay" label="Compensation Range" />
            <el-table-column prop="range" label="Date Range" />

        </el-table>
        </el-col>
        <el-col :span="2"></el-col>
    </el-row>         
            
        <!-- Full Description -->
        <div class="details">
            <div class="tabbable">
                <!-- Tabs -->
                <el-tabs :tab-position= "top" >
                    <!-- TODO data from firebase -->
                    <el-tab-pane label="Job Description">
                        {{job_descr}}
                    </el-tab-pane>
                    <el-tab-pane label="Technical Competencies">
                        {{tech_compet}}
                    </el-tab-pane>
                    <el-tab-pane label="Soft Competencies">
                        {{soft_compet}}
                    </el-tab-pane>
                    <el-tab-pane label="Location">
                        {{location}}
                    </el-tab-pane>
                </el-tabs>

            </div>
        </div>

        <!--  APPLY  -->
        <!-- <el-button id ='applyBtn' type="success" @click='apply'>Apply</el-button> -->

        <el-col :span="6" class="apply-btn-container">
        <i class="applybtn">
            <el-button size="small" type="success" @click="apply()"
                >Apply</el-button
            >
        </i>
        </el-col> 

        <el-backtop />


    </div>
    <!-- </div> -->
</template>


<script>
import StudentNav from '../../components/StudentNav.vue'
import firebaseApp from '../../main.js'
import { getFirestore} from "firebase/firestore";
import {
  getDocs,
  setDoc,
  collection,
  getDoc,
  updateDoc,
  arrayUnion,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// dummy data
const tableData = [{
    yr: '2',
    duration: '3 months',
    loc: 'remote',
    pay: "20000"
}]

var jobData = [];
// var queriedData = ref([]);


export default {
    name: 'StudentViewListing',

    components:{
        StudentNav
    },

    data() {
        return {
            //dummy data, to get from firebase later on
            tableData,
            // img: '../../assets/employer-login-pic.png',
            // img: '../../assets/',

            url: "employer-login-pic.png",

            job_title: "Software Engineer",
            job_descr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ir\
                        ure dolor in reprehende rit in voluptate velit esse cillum dolore eu fu…",
            tech_compet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ir\
                        ure dolor in reprehende rit in voluptate velit esse cillum dolore eu fu…TECH COMPETENCY",
            soft_compet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ir\
                        ure dolor in reprehende rit in voluptate velit esse cillum dolore eu fu… SOFT COMPETENCY",
            location: "location",

            test: this.$route.params.listing
            
            

        }
    },

    methods: {
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
            // send resume
        
    },

    async created() {
        const db = getFirestore(firebaseApp);
        const auth = getAuth()
        const uid = auth.currentUser.uid
        const docRef = doc(db, "User", "" + uid);
        console.log(docRef);
        // TODO
        // console.log('Params: ', this.$route.params.listing);
        console.log('Params: ', this.$route.params.listing);
        // const clickedListingData = this.$route.query.StudentViewListing;
        // console.log(clickedListingData[0]["companyname"])





    },

    afterMount() {
        console.log('Params: ', this.$route.params.listing);
    },

    async beforeMount() {

        async function getData() {

        jobData = [];

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

        this.queriedData = jobData;
    },    
}

    
</script>

<style>

    .company-profile {
        width: 20%;
    }

    #general_info

    .eltable {
        width: 60%;
        border: 4px solid black;
        align: "center";
        border-radius: 15px;        

    }
    tr:hover {
        background-color: lightyellow;
    }

    /* #backtop_btn {
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
    } */

</style>
