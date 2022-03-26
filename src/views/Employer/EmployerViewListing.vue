<template>
        <EmployerNav/>

        <div id="general_info">

            <p id="writeup">
                {{writeup}}
            </p>

            <h3> {{job_title}}</h3>
            <el-image
                class="company-profile"
                :src="img"
            />

        </div>
            
        <!-- Full Description -->
        <div class="tabbable">
            <!-- Tabs -->
            <el-tabs tab-position="left" class="detailtabs">
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

    <!-- Edit & Delete Listing -->
    <el-button id = 'editListing' type="primary" :icon="Edit" circle @click='editListing'/>
    <el-button id = 'deleteListing' type="danger" :icon="Delete" circle @click='deleteListing'/>


        <el-backtop :bottom="100">
            <div>
            UP
            </div>
        </el-backtop>


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

    .company-profile {
        width: 20%;
    }

    .detailtabs > .el-tabs__content {
        padding: 15px;
        color: #6b778c;
        font-size: 20px;
        font-weight: 400;
        height: 100%;
    }

/* 
    #detailtabs {
        tab-position: "left";
    } */

    #backtop_btn {
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
    }

</style>
