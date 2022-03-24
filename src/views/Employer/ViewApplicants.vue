!<template>
  <NavBar/>

  <br><br>

<el-row>

  <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
    >
      <el-table-column width="180" />
      <el-table-column prop="title" label="Job" width="180" />
      <el-table-column prop="date" label="Date Applied" width="180" />
      <el-table-column prop="name" label="Applicant Name" width="180" />
      <el-table-column prop="resume" label="Resume" width="180" />
      <el-table-column prop="talk" label="Communicate" width="180" />
      <el-table-column prop="offer" label="Offer" width="180" />
      <el-table-column prop="reject" label="Reject" width="180" />
    
    </el-table>
    </el-row>
</template>

<script>
import { getAuth } from "firebase/auth";
import firebaseApp from "../../main.js";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import NavBar from "../../components/EmployerNav.vue"

var tableData = []

export default {
    data() {
        return {
            tableData,
        }
    },
    components : {
        NavBar
    },
    async beforeMount() {

        async function getData(){

            tableData = []

            const auth = getAuth();
            const id = auth.currentUser.uid
            const db = getFirestore(firebaseApp);
            const docRef = doc(db, "User", id);
            const docSnap = await getDoc(docRef);
            const jobArr = docSnap.data().Jobs
            const companyName = docSnap.data().CompanyName

            console.log(jobArr)

            for (var i = 0; i < jobArr.length; i++) {
                const currJob = companyName.concat(" - ", jobArr[i])
                console.log(currJob)
                const docRef1 = doc(db, "Job", currJob)
                const docSnap1 = await getDoc(docRef1);
                if (!docSnap1.exists()) {
                    continue;
                }
                const app = docSnap1.data().Applicants;

                if (app.length == 0) {
                    tableData.push({title : docSnap1.data().InternshipTitle})
                } else {
                    const child = []
                    
                    for (var j = 0; j < app.length; j++) {
                        const currApplicant = app[j]
                        const docRef2 = doc(db, "User", currApplicant)
                        const docSnap2 = await getDoc(docRef2)
                        const appName = docSnap2.data().Name
                        const docName = companyName.concat(" - ", docSnap1.data().InternshipTitle, " - ", currApplicant)
                        console.log(docName)
                        const docRef3 = doc(db, "Application", docName)
                        const docSnap3 = await getDoc(docRef3)
                        child.push({
                            name : appName,
                            resume : "placeholder",
                            date : docSnap3.data().CreatedAt.toDate().toString().slice(4,15),
                        })
                    }

                    tableData.push({title:docSnap1.data().InternshipTitle, children : child})

                }
            }
        }
        await getData();
        console.log(tableData)
    }
}
</script>

<style>

</style>