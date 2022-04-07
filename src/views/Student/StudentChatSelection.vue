<template>
  <NavBar />

  <h1 style="margin-bottom: 40px">Messages</h1>
  <!-- <div style="margin-top: 5%">
    <el-table
      :data="chatArr"
      style="width: 50%; margin-top: 5%; margin: auto"
      row-key="id"
      align="center"
      size="large"
    >
      <el-table-column prop="nameid" label="Applicant Name" width="270" />
      <el-table-column prop="jobsInSameCoy" label="Jobs Applied" width="540" />
      <el-table-column width="120">
        <template #default="scope">
          <el-button size="small" type="info" @click="goToChat(scope.row.uid)"
            >View Message</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div> -->

  <el-row>
    <el-col :span="7"></el-col>
    <el-col :span="10" class="conversation-container">
      <el-scrollbar>
        <el-card
          class="box-card"
          shadow="hover"
          v-for="user in chatArr"
          :key="user"
        >
          <el-row>
            <el-col :span="22"
              ><div class="card-body" @click="goToChat(user.uid)">
                <el-avatar :size="30" :src="user.imageURL" class="avatar-img" />
                <h5 class="name-msg">{{ user.nameid }}</h5>
              </div>
              <div class="tags-container">
                <el-scrollbar>
                  <div class="scrollbar-flex-content">
                    <el-tag
                      v-for="job in user.jobsArray"
                      :key="job"
                      class="job-tag"
                      >{{ job }}</el-tag
                    >
                  </div>
                </el-scrollbar>
              </div>
            </el-col>
            <el-col :span="2"
              ><el-icon color="#DDE1E8" :size="30" class="chat-icon"
                ><chat-square @click="goToChat(user.uid)" /></el-icon
            ></el-col>
          </el-row>
        </el-card>
      </el-scrollbar>
    </el-col>
    <el-col :span="7"></el-col>
  </el-row>
</template>

<script>
import { getAuth } from "firebase/auth";
import firebaseApp from "../../main.js";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import NavBar from "../../components/StudentNav.vue";

import { ChatSquare } from "@element-plus/icons-vue";

export default {
  components: {
    NavBar,

    ChatSquare,
  },
  data() {
    return {
      chatArr: [],
    };
  },

  methods: {
    goToChat(x) {
      this.$router.push({
        path: "/studentchat",
        query: { id: x, prevPage: "student" },
      });
    },
  },

  async beforeCreate() {
    const id = getAuth().currentUser.uid;
    const db = getFirestore(firebaseApp);
    const docRef = doc(db, "User", id); //student
    const docSnap = await getDoc(docRef);

    const chats = docSnap.data().Chats;
    for (var i = 0; i < chats.length; i++) {
      const currChat = chats[i];
      const docRef1 = doc(db, "User", currChat);
      const docSnap1 = await getDoc(docRef1);

      const name = docSnap1.data().CompanyName;
      const jobsApplied = docSnap.data().JobsApplied;
      const imageURL = docSnap1.data().photoURL;
      var jbs = "";
      const jobArray = [];
      for (i = 0; i < jobsApplied.length; i++) {
        const curr = jobsApplied[i];
        const arr = curr.split(" - ");
        if (arr[0] == name) {
          jobArray.push(arr[1]);
          jbs = jbs.concat(arr[1], ", ");
        }
      }

      jbs = jbs.slice(0, -2);

      this.chatArr.push({
        uid: currChat,
        nameid: name,
        jobsInSameCoy: jbs,
        imageURL: imageURL,
        jobsArray: jobArray,
      });
      console.log(this.chatArr);
    }
  },
};
</script>

<style scoped>
chat-square {
  cursor: pointer;
}

.box-card {
  margin: 15px;
  /* cursor: pointer; */
}
.chat-icon {
  margin: 0 auto;
  height: 100%;
  cursor: pointer;
}
.job-tag {
  margin-right: 10px;
}
.scrollbar-flex-content {
  display: flex;
}
.avatar-img {
  margin-right: 10px;
}
.tags-container {
  font-family: "Poppins";
  margin: 10px;
  display: flex;
}
.card-body {
  display: flex;
  margin: 10px;
  cursor: pointer;
}
.name-msg {
  display: inline;
  font-family: "Poppins";
  font-size: 15px;
  margin: auto 0;
}
.conversation-container {
  height: 500px;
  background-color: #fff;
  border-radius: 15px;
  /* overflow: scroll;   */
  margin-bottom: 40px;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>
