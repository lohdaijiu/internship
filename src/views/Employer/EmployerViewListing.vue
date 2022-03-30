<template>
        <EmployerNav/>
    <el-row
            >   
    <!-- <el-col :span="2"><div class="grid-content" /></el-col> -->
    <el-col :span="8">

        <div id="general_info">
                <h2>{{company_name}}</h2>
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
            color="#d4d381"
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
            height="100"
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
        align="left">
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

// dummy data
const tableData = [{
    yr: '2',
    duration: '3 months',
    loc: 'remote',
    pay: "20000"
}]

export default {
    name: 'EmployerViewListing',

    components:{
        EmployerNav
    },

    data() {
        return {
            // data to get from firebase
            tableData,
            img: '../../assets/',
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
            location: "location"
        }
    },

    methods: {
        editListing() {
            // direct to create/edit listing page
            this.$router.push({ path: "/EditListing" });

        },
        deleteListing() {
            return;
            // remove listing from database

        }
        
    },
}

    
</script>

<style>
    #general_info, #details, #table-container {
        font-family: "Poppins";
        text-align: center;

    }

    #table-container {
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
/* 
    #editbtn:hover {

        background-color: #D4D381;

    } */


</style>
