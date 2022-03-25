<template>
        <EmployerNav/>

        <div id="general_info">

            <p id="writeup">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ir
                ure dolor in reprehende rit in voluptate velit esse cillum dolore eu fu…
            </p>

            <h3> Software Engineer </h3>
            <el-image
                class="company-profile"
                :src="require('../../assets/' + url)"
            />

        </div>
            
        <!-- Full Description -->
        <div class="tabbable">
            <!-- Tabs -->
            <el-tabs tab-position="left" class="detailtabs">
                <!-- TODO data from firebase -->
                <el-tab-pane label="Job Description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ir
                    ure dolor in reprehende rit in voluptate velit esse cillum dolore eu fu…
                </el-tab-pane>
                <el-tab-pane label="Technical Competencies">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ir
                    ure dolor in reprehende rit in voluptate velit esse cillum dolore eu fu…
                    Technical Competencies
                </el-tab-pane>
                <el-tab-pane label="Soft Competencies">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ir
                    ure dolor in reprehende rit in voluptate velit esse cillum dolore eu fu…                        
                    Soft Competencies
                </el-tab-pane>
                <el-tab-pane label="Location">
                    Location
                </el-tab-pane>
            </el-tabs>

        </div>


</template>


<script>
import EmployerNav from '../../components/EmployerNav.vue'

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
            url: "employer-login-pic.png",
            //to get from firebase lateron
            tableData
        }
    }
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


</style>
