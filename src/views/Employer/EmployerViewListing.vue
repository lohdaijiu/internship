<template>
        <EmployerNav/>
    <el-row
            >   
    <!-- <el-col :span="2"><div class="grid-content" /></el-col> -->
    <el-col :span="8">

        <div id="general_info">
                <h3> {{job_title}}</h3>
        </div>
    </el-col>
    <el-col :span="10"><div class="grid-content" /></el-col>

    <!-- Edit & Delete Listing -->

        <el-col :span="2"
                class="editcol"
        ><el-button
            id="editbtn"
            @click="editJob()"
            color="#A5A6F6"
            type="primary"
            ><p class="btn-text">Edit</p></el-button
        ></el-col
        >
        <!-- <el-col :span="2"><div class="grid-content" /></el-col> -->
        <el-col :span="2"
                class="deletecol"
        ><el-button
            id="deletebtn"
            @click="deleteJob()"
            type="danger"
            ><p class="btn-text">Delete</p></el-button
        ></el-col
        >  
        <el-col :span="2"><div class="grid-content" /></el-col>

     </el-row>  

    <el-row id="table-container">
        <el-col :span="2"></el-col>
        <el-col :span="20">
        <el-table
            ref="tableRef"
            :data="tableData"
            height="120"
            style="width: 100%"
            align="center"
        >
            <el-table-column prop="yos" label="Year of Study"/>
            <el-table-column prop="duration" label="Duration"/>
            <el-table-column prop="compensation" label="Compensation" />
            <el-table-column prop="range" label="Date Range" />
            <el-table-column prop="postdate" label="Date Posted" />

        </el-table>
        </el-col>
        <el-col :span="2"></el-col>
    </el-row>      

    <!-- Full Description -->
    <div id="details"
        >
        <div class="tabbable"
            align="left">
            <!-- Tabs -->
            <el-tabs tab-position="left" stretch="true">
                <el-tab-pane label="Job Description">
                    {{job_descr}}
                </el-tab-pane>
                <el-tab-pane label="Technical Competencies">
                    {{tech_compet}}
                </el-tab-pane>
                <el-tab-pane label="Location">
                    {{location}}
                </el-tab-pane>
            </el-tabs>

        </div>
    </div>

</template>


<script>
import EmployerNav from '../../components/EmployerNav.vue'
import firebaseApp from "../../main.js";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";

var listingName = "";
var listingData = [];
var tableData = [];
var onlyListing = [];

export default {
    name: 'EmployerViewListing',

    components:{
        EmployerNav
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
        }
    },

    methods: {
        editJob() {
            // TODO direct to edit listing page
            this.$router.push({ path: "/editjoblisting" });

        },

        async deleteJob() {
            const db = getFirestore(firebaseApp);
            const docName = this.$route.query.jobId

            await updateDoc(doc(db, "Job", docName), {
                Deleted : true
            });


        },
        
    },

    async created() {

        console.log('Query: ', this.$route.query.jobId);
        listingName = this.$route.query.jobId;

        listingData = [];
        const db = getFirestore(firebaseApp);

        const docName = listingName
        const docRef = doc(db, "Job", docName);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("exists")
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
                    competency: docSnap.data().PreferredCompetencies
                    
                })

                tableData = [];

                onlyListing = Object.entries(listingData[0]).map((e) => ( { [e[0]]: e[1] } ));
                console.log(onlyListing);
                this.tableData.push({
                    "yos": onlyListing[3]["yos"], 
                    "duration": onlyListing[2]["duration"],
                    "compensation": onlyListing[6]["compensation"],
                    "postdate": onlyListing[1]["postdate"],
                    "range": onlyListing[5]["range"]
                })
                
            } catch (error) {
                console.log(error)
            }  
        }   
        
        this.job_descr = listingData[0]["description"]
        this.job_title = listingData[0]["jobpos"]
        this.tech_compet = listingData[0]["competency"]
        this.location = listingData[0]["worklocation"]

    }, 
}

    
</script>

<style scoped>
    #general_info, #details, #table-container {
        font-family: "Poppins";
        text-align: center;

    }

    #table-container, #details {
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

    #editbtn, #deletebtn {
        border-radius: 10px;
        text-align: center;

        font-weight: bold;
        border-style: solid;
        width: 75%;
    }

    >>> .el-table__header tr {
        color: #A5A6F6;

    }
/* 
    #editbtn:hover {

        background-color: #D4D381;

    } */


</style>
