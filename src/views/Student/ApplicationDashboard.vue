!<template>
<div v-if="done">
<NavBar /> <br>
<h1> Application DashBoard </h1> <br>

<el-row>
    <el-col :span="2"></el-col>
    <el-col :span="20">
<el-table :data="tableData" style="width: 100%"  default-expand-all>

    <el-table-column prop="companyname" label="Company" width="180" />
    <el-table-column prop="jobpos" label="Job Position" width="180" />
    <el-table-column prop="date" label="Date Applied" />
    <el-table-column prop="progress" label="Progress" />
    <el-table-column prop="status" label="Accept/Reject Offer">
        <template #default="scope">
            <el-button size="small" type="success" @click="accept(scope.row)" v-if="rendered(scope.row)"
              >Accept</el-button
            >
            <el-button size="small" type="warning" @click="reject(scope.row)" v-if="rendered(scope.row)"
              >Reject</el-button
            >
          </template>    
    </el-table-column>

</el-table>
</el-col>
</el-row>
</div>
</template>

<script>
import NavBar from "../../components/StudentNav.vue"
import { getDoc, getFirestore, doc, updateDoc } from "firebase/firestore";
import firebaseApp from "../../main.js";
import { getAuth } from "firebase/auth";

var tableData = [];

export default {
    components : {
        NavBar,
    },
    data() {
        return {
            tableData,
            done : false
        }
    },
    methods : {
        rendered(x) {
            if (x.status == "Pending student reply") {
                return true;
            } else {
                return false;
            }
        },

        async accept(x) {
            const id = getAuth().currentUser.uid
            const db = getFirestore(firebaseApp);
            const docName = x.companyname.concat(" - ", x.jobpos, " - ", id)

            await updateDoc(doc(db, "Application", docName), {
                Status: "Accepted by Student"
            });

            alert("Offer Accepted")
            window.location.reload();
        },

        async reject(x) {
            const id = getAuth().currentUser.uid
            const db = getFirestore(firebaseApp);
            const docName = x.companyname.concat(" - ", x.jobpos, " - ", id)

            await updateDoc(doc(db, "Application", docName), {
                Status: "Rejected by Student"
            });

            alert("Offer Rejected")
            window.location.reload();
        },
    },

    async beforeCreate() {
        async function getData() {

            tableData = []

            try {
                const id = getAuth().currentUser.uid
                const db = getFirestore(firebaseApp);
                const docRef = doc(db, "User", id);
                const doc1 = await getDoc(docRef)
                const jobArr = doc1.data().JobsApplied
                
                for (var i = 0; i < jobArr.length; i++) {
                    const docRef1 = doc(db, "Application", jobArr[i]);
                    const document1 = await getDoc(docRef1);
                    const jobInfo = document1.data();
                    tableData.push({
                        companyname : jobInfo.CompanyName,
                        jobpos : jobInfo.Position,
                        date : jobInfo.CreatedAt.toDate().toString().slice(4,15),
                        progress: jobInfo.Progress,
                        status : jobInfo.Status
                    })
                
                }
                console.log("done")
            } catch (error) {
                console.error(error)
            }
        }

        await getData().then(() => {this.done = true});
        console.log(tableData);
    }
}
</script>

<style>

</style>