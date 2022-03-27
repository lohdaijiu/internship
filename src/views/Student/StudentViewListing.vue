<template>
<div>
    <StudentNav/>       

    <div id="general_info">
        <h2>{{company_name}}</h2>

        <h3> {{job_title}}</h3>
        <!-- <el-image
            class="company-profile"
            :src="require('../../assets/' + url)"
        /> -->
        <br>
        <br>

    </div>

    <el-row class="table-container">
        <el-col :span="2"></el-col>
        <el-col :span="20">
        <el-table
            ref="tableRef"
            :data="tableData"
            height="250"
            style="width: 100%"
        >
            <el-table-column prop="yos" label="Year of Study"/>
            <el-table-column prop="duration" label="Internship Duration"/>
            <el-table-column prop="compensation" label="Compensation" />
            <el-table-column prop="range" label="Date Range" />
            <el-table-column prop="postdate" label="Date Posted" />

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
                    <!-- <el-tab-pane label="Soft Competencies">
                        {{soft_compet}}
                    </el-tab-pane> -->
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
//   getDocs,
  setDoc,
//   collection,
  getDoc,
  updateDoc,
  arrayUnion,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import { list } from '@firebase/storage';



var listingName = "";

var listingData = [];
var tableData = [];
var onlyListing = [];

export default {
    name: 'StudentViewListing',

    components:{
        StudentNav
    },

    data() {
        return {

            listingData,
            listingName,
            tableData,
            // img: '../../assets/employer-login-pic.png',
            // img: '../../assets/',

            // url: "",

            job_title: "",
            job_descr: "",
            tech_compet: "",
            soft_compet: "",
            location: "",
            company_name: "",
    
            onlyListing
            

            // test: this.$route.params.listing
            
            

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
        // listingData = [];
        // const db = getFirestore(firebaseApp);
        // const auth = getAuth()
        // const uid = auth.currentUser.uid
        // const docRef = doc(db, "User", "" + uid);
        // console.log(docRef);
        // console.log('Params: ', this.$route.params.listing);
        console.log('Params: ', this.$route.params.jobId);
        listingName = this.$route.params.jobId;

        // listingData = this.getListing(this.$route.params.listing);
        
        
        // const clickedListingData = this.$route.query.StudentViewListing;
        // console.log(clickedListingData[0]["companyname"])





    },

    // afterMount() {
    //     console.log('Params: ', this.$route.params.listing);
    // },

    async beforeMount() {

        async function getListing() {
            listingData = [];

            // console.log("the listing" + x);
            console.log("getting listing")
            const db = getFirestore(firebaseApp);
            // const id = getAuth().currentUser.uid;
            // const docName = x[0].concat(x[1])
            // const docName = x.companyname.concat(" - ", x.jobpos)
            // const docName = this.$route.params.jobId
            const docName = listingName
            console.log(docName);
            const docRef = doc(db, "Job", docName);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("exists")
                try {
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
                        competency: docSnap.data().PreferredCompetencies
                        
                    })
                    console.log(listingData);

                    console.log(listingData[0]["competency"]);

                    // return ListingData;
                    
                } catch (error) {
                    console.log(error)
                }  
            }
        }

        await getListing();

        // onlyListing = Object.entries(listingData[0]);
        // console.log(onlyListing)

        onlyListing = Object.entries(listingData[0]).map((e) => ( { [e[0]]: e[1] } ));
        console.log(onlyListing);
        tableData.push({
            "yos": onlyListing[4]["yos"], 
            "duration": onlyListing[3]["duration"],
            "compensation": onlyListing[7]["compensation"],
            "postdate": onlyListing[2]["postdate"],
            "range": onlyListing[6]["range"]
        })
        console.log(tableData[0])


        // Object.keys(listingData[0]).forEach(key => onlyListing.push({
        //     listingData[0][key],
        // }));

        this.job_descr = listingData[0]["description"]
        this.job_title = listingData[0]["jobpos"]
        this.tech_compet = listingData[0]["competency"]
        this.location = listingData[0]["worklocation"]
        this.company_name = listingData[0]["companyname"]

        // console.log(this.company_name)


        

        // async function getData() {

        // jobData = [];

        // try {
            
        //     const db = getFirestore(firebaseApp);
        //     const querySnapshot = await getDocs(collection(db, "Job"));
        //     querySnapshot.forEach((doc) =>
        //     jobData.push({
        //         companyname: doc.data().CompanyName,
        //         jobpos: doc.data().InternshipTitle,
        //         postdate: doc.data().CreatedAt.toDate().toString().slice(4, 15),
        //         duration: doc.data().Duration,
        //         yos: doc.data().Year,
        //         worklocation: doc.data().Type,
        //         range: doc
        //         .data()
        //         .DateRange[0].toDate()
        //         .toString()
        //         .slice(4, 15)
        //         .concat(
        //             " - ",
        //             doc.data().DateRange[1].toDate().toString().slice(4, 15)
        //         ),
        //     })
        //     );
        //     console.log("success");
            
        // } catch (error) {
        //     console.error(error);
        // }
        // }
        // await getData();

        // this.queriedData = jobData;
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
