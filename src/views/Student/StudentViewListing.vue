<template>
    <body>
        <StudentNav/>

        <div id="general_info">

            <h3> {{job_title}}</h3>
            <el-image
                class="company-profile"
                :src="img"
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
        <el-button id ='applyBtn' type="success" @click='apply'>Apply</el-button>




    </body>
    <!-- </div> -->
</template>


<script>
import StudentNav from '../../components/StudentNav.vue'
import firebaseApp from '../main.js'
import { getFirestore} from "firebase/firestore";
import { doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

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
            tableData,
            img: require('../../assets/'),
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
        apply() {
            // send resume
        }
        
    },

    async created() {
        const db = getFirestore(firebaseApp);
        const auth = getAuth()
        const uid = auth.currentUser.uid
        const docRef = doc(db, "User", "" + uid);
        console.log(docRef);
        // TODO


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

</style>
