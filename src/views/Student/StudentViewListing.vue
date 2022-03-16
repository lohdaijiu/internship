<template>
    <!-- <div style="text-align:center;" v-if="user"> -->
        <StudentNav/>

        <div id="general_info">

            <h3> Software Engineer </h3>
            <el-image
                class="company-profile"
                :src="require('../../assets/' + url)"
            />

            <el-table id = "eltable" :data= "tableData">
                <el-table-column prop="yr" label="Undergraduate Years"/>
                <el-table-column prop="duration" label="Work Duration"/>
                <el-table-column prop="loc" label="Remote/On-site" />
                <el-table-column prop="pay" label="Compensation Range" />
            </el-table>
            <br>
            <br>

        </div>
            
        <!-- Full Description -->
        <div class="details">
            <div class="tabbable">
                <!-- Tabs -->
                <el-tabs :tab-position= "top" >
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
        </div>


    <!-- </div> -->
</template>


<script>
import StudentNav from '../../components/StudentNav.vue'

const tableData = [{
    yr: '2',
    duration: '3 months',
    loc: 'remote',
    pay: "20000"
}]

export default {
    name: 'StudentViewListing',

    components:{
        StudentNav
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

</style>
