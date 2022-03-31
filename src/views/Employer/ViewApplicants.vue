!<template>
  <div v-if="done">
    <NavBar />

    <br /><br />

    <el-row>
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        default-expand-all
      >
        <el-table-column prop="title" label="Job" width="180" />
        <el-table-column prop="date" label="Date Applied" width="180" />
        <el-table-column prop="name" label="Applicant Name" width="180" />
        <el-table-column width="180">
          <template #default="scope">
            <el-button
              size="small"
              type="info"
              @click="viewProfile(scope.row)"
              v-if="rendered(scope.row)"
              >View Profile</el-button
            >
          </template>
        </el-table-column>

        <el-table-column prop="talk" label="Communicate" width="360">
          <template #default="scope">
            <el-button
              size="small"
              type="info"
              @click="createRoom(scope.row)"
              v-if="rendered(scope.row)"
              >Create Chat</el-button
            >
            <el-button
              size="small"
              type="info"
              @click="videoCall(scope.row)"
              v-if="rendered(scope.row)"
              >Video Call</el-button
            >
          </template>
        </el-table-column>
        <el-table-column width="180" label="Decision">
          <template #default="scope">
            <el-button
              size="small"
              type="success"
              @click="offer(scope.row)"
              v-if="rendered(scope.row)"
              >Offer</el-button
            >
            <el-button
              size="small"
              type="warning"
              @click="reject(scope.row)"
              v-if="rendered(scope.row)"
              >Reject</el-button
            >
          </template>
        </el-table-column>
        <el-table-column prop="status" label="Status" width="180" />
        <el-table-column width="180">
          <template #default="scope">
            <el-button
              size="small"
              type="danger"
              @click="deleteJob(scope.row)"
              v-if="deleted(scope.row)"
              >Delete</el-button
            >
            <!-- <el-button type="danger" icon="Delete" circle @click="deleteJob(scope.row)" v-if="deleted(scope.row)"/> -->

            <small v-if="alreadyDeleted(scope.row)"> Deleted </small>
          </template>
        </el-table-column>

        <el-table-column width="180">
          <template #default="scope">
            <el-button
              size="small"
              type="success"
              @click="viewListing(scope.row)"
              v-if="canView(scope.row)"
              >View Job</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";
import firebaseApp from "../../main.js";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, updateDoc, setDoc, arrayUnion } from "firebase/firestore";
import NavBar from "../../components/EmployerNav.vue";
import { alertMsg } from "../../functions/alertMsg";
// import {
//   Delete
// } from '@element-plus/icons-vue'

var tableData = [];

export default {
  data() {
    return {
      tableData,
      empty: false,
      done: false,
    };
  },
  components: {
    NavBar,
  },
  methods: {
    async viewListing(x) {
      try {
        const id = getAuth().currentUser.uid;
        const db = getFirestore(firebaseApp);
        const docRef = doc(db, "User", id);
        const docSnap = await getDoc(docRef);
        const employerName = docSnap.data().CompanyName;
        const docName = employerName.concat(" - ", x.title);

        this.$router.push({
          path: "/viewpostedlisting",

          query: { jobId: docName },
        });
      } catch (error) {
        console.log(error);
      }
    },

    async videoCall(x) {
      const id = getAuth().currentUser.uid;
      const db = getFirestore(firebaseApp);
      const docRef1 = doc(db, "User", id);
      const docSnap = await getDoc(docRef1);
      const employerName = docSnap.data().CompanyName;
      const room = employerName.concat(" - ", x.name);
      this.$router.push({ path: "/employervideo", query: { roomName: room } });
    },

    async createRoom(x) {
      const id = getAuth().currentUser.uid;
      const db = getFirestore(firebaseApp);
      const docName = id.concat(" - ", x.uid);
      const docRef4 = doc(db, docName, "firstDoc");
      const docSnap = await getDoc(docRef4);
      if (docSnap.exists()) {
        this.$router.push("/employerchatselection");
        alertMsg("error", "Chat Room already created!");
      } else {
        const data = { created: true };
        await setDoc(docRef4, data);
        console.log("asdf");
        const docRef5 = doc(db, "User", id);
        const docRef6 = doc(db, "User", x.uid);
        await updateDoc(docRef5, { Chats: arrayUnion(x.uid) });
        await updateDoc(docRef6, { Chats: arrayUnion(id) });
        //this.$router.push('/employerchatselection')
        //await deleteDoc(doc(db, docName, "firstDoc"));
      }

      //create collection for chats

      //add chats to both
    },

    async deleteJob(x) {
      const id = getAuth().currentUser.uid;
      const db = getFirestore(firebaseApp);
      const docRef = doc(db, "User", id);
      const docSnap = await getDoc(docRef);
      const employerName = docSnap.data().CompanyName;
      const docName = employerName.concat(" - ", x.title);

      await updateDoc(doc(db, "Job", docName), {
        Deleted: true,
      });
    },

    async offer(x) {
      const id = getAuth().currentUser.uid;
      const db = getFirestore(firebaseApp);
      const docRef = doc(db, "User", id);
      const docSnap = await getDoc(docRef);
      const employerName = docSnap.data().CompanyName;
      const docName = employerName.concat(" - ", x.title, " - ", x.uid);

      await updateDoc(doc(db, "Application", docName), {
        Status: "Pending student reply",
      });

      alert("Offer sent");
      window.location.reload();
    },
    async reject(x) {
      const id = getAuth().currentUser.uid;
      const db = getFirestore(firebaseApp);
      const docRef = doc(db, "User", id);
      const docSnap = await getDoc(docRef);
      const employerName = docSnap.data().CompanyName;
      const docName = employerName.concat(" - ", x.title, " - ", x.uid);

      await updateDoc(doc(db, "Application", docName), {
        Status: "Rejected",
      });

      alert("Applicant Rejected");
      window.location.reload();
    },

    alreadyDeleted(x) {
      if (x.date == null && x.deletion == true) {
        return true;
      } else {
        return false;
      }
    },
    rendered(x) {
      if (x.status == "Pending") {
        return true;
      } else {
        return false;
      }
    },
    deleted(x) {
      if (x.date == null && x.deletion == false) {
        return true;
      } else {
        return false;
      }
    },
    canView(x) {
      if (x.date == null) {
        return true;
      } else {
        return false;
      }
    },
    viewProfile(x) {
      this.$router.push({ path: "/viewprofile", query: { id: x.uid } });
    },
  },

  async beforeCreate() {
    async function getData() {
      try {
        tableData = [];

        const auth = getAuth();
        const id = auth.currentUser.uid;
        const db = getFirestore(firebaseApp);
        const docRef = doc(db, "User", id);
        const docSnap = await getDoc(docRef);
        const jobArr = docSnap.data().Jobs;
        const companyName = docSnap.data().CompanyName;

        console.log(jobArr);

        for (var i = 0; i < jobArr.length; i++) {
          const currJob = companyName.concat(" - ", jobArr[i]);
          console.log(currJob);
          const docRef1 = doc(db, "Job", currJob);
          const docSnap1 = await getDoc(docRef1);
          if (!docSnap1.exists()) {
            continue;
          }
          const app = docSnap1.data().Applicants;

          if (app.length == 0) {
            tableData.push({
              title: docSnap1.data().InternshipTitle,
              deletion: docSnap1.data().Deleted,
            });
          } else {
            const child = [];

            for (var j = 0; j < app.length; j++) {
              const currApplicant = app[j];
              const docRef2 = doc(db, "User", currApplicant);
              const docSnap2 = await getDoc(docRef2);
              const appName = docSnap2.data().Name;
              const docName = companyName.concat(
                " - ",
                docSnap1.data().InternshipTitle,
                " - ",
                currApplicant
              );
              console.log(docName);
              const docRef3 = doc(db, "Application", docName);
              const docSnap3 = await getDoc(docRef3);

              child.push({
                name: appName,
                resume: docSnap2.data().resumeURL,
                date: docSnap3
                  .data()
                  .CreatedAt.toDate()
                  .toString()
                  .slice(4, 15),
                title: docSnap1.data().InternshipTitle,
                uid: docSnap3.data().Applicant,
                status: docSnap3.data().Status,
              });
            }

            tableData.push({
              title: docSnap1.data().InternshipTitle,
              deletion: docSnap1.data().Deleted,
              children: child,
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    await getData().then(() => {
      this.done = true;
    });
    console.log(tableData);
  },
};
</script>

<style>
</style>