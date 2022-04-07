<template>
  <div class="wrapper">
    <el-row>
      <el-col :span="8"> </el-col>
      <el-col :span="8" class="chat-header"
        ><div
          class="header-ele"
          :class="{
            'bg-green': this.$route.query.prevPage.length > 0,
            'bg-purple': this.$route.query.prevPage.length == 0,
          }"
        >
          <el-avatar
            class="avatar-img"
            :src="avatarImg"
            fit="cover"
            :size="40"
          />
          <h4 class="profile-name">{{ this.usersName }}</h4>
        </div>
        <div ref="chatArea" class="chat-area" id="chat-Area">
          <p
            v-for="msg in this.messages"
            class="message"
            :class="{
              'message-out': msg.receiver.length != 0,
              'message-in': msg.receiver.length == 0,
            }"
            :key="msg"
          >
            {{ msg.msg }}
          </p>
        </div>
        <el-row>
          <el-col :span="4"> </el-col>
          <el-col :span="12">
            <el-input
              v-model="message"
              size="large"
              placeholder="Enter your message!"
              style=""
              maxlength="50"
            />
          </el-col>
          <el-col :span="4">
            <el-button
              size="large"
              type="info"
              @click="sendMessage"
              style="margin-left: 30px"
              :class="{
                'bg-green': this.$route.query.prevPage.length > 0,
                'bg-purple': this.$route.query.prevPage.length == 0,
              }"
              >Send</el-button
            >
          </el-col>
          <el-col :span="4"> </el-col>
        </el-row>
      </el-col>
      <el-col :span="8"> </el-col>
    </el-row>

    <!-- <section>
      <div>
        <el-input
          v-model="message"
          size="large"
          placeholder="Enter your message!"
          style="width: 26%; margin-left: 35%; margin-top: 1%"
          maxlength="50"
        />
        <el-button
          size="large"
          type="info"
          @click="sendMessage"
          style="margin-right: 30px"
          >Send</el-button
        >
      </div>
    </section> -->
  </div>
</template>

<script>
import firebaseApp from "../main.js";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import { nextTick } from "vue";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  orderBy,
  query,
  doc,
  getDoc,
} from "firebase/firestore";

export default {
  async mounted() {
    try {
      const db = getFirestore(firebaseApp);
      const id = getAuth().currentUser.uid;

      const docRef = doc(db, "User", id);
      const docSnap = await getDoc(docRef);
      this.employer = docSnap.data().Employer;

      const docRef2 = doc(db, "User", this.$route.query.id);
      const docSnap2 = await getDoc(docRef2);
      if (docSnap2.data().Employer == false) {
        this.usersName = docSnap2.data().Name;
      } else {
        this.usersName = docSnap2.data().CompanyName;
      }
      this.avatarImg = docSnap2.data().photoURL;
      console.log(this.avatarImg);
      if (this.employer) {
        this.collectionName = id.concat(" - ", this.$route.query.id);
      } else {
        this.collectionName = this.$route.query.id.concat(" - ", id);
      }
      console.log(this.collectionName);
      const q = query(
        collection(db, this.collectionName),
        orderBy("createdAt")
      );
      onSnapshot(q, (querySnapshot) => {
        this.messages = querySnapshot.docs.map((doc) => {
          if (doc.data().userUID == id) {
            //console.log({ sender: "", receiver: doc.data().text });
            return {
              sender: "",
              receiver: doc.data().text,
              msg: doc.data().text,
            };
          } else {
            //console.log({ sender: doc.data().text, receiver: "" });
            return {
              sender: doc.data().text,
              receiver: "",
              msg: doc.data().text,
            };
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  },
  data() {
    return {
      message: "",
      messages: [],
      employer: false,
      collectionName: "",
      usersName: "",
      avatarImg: "",
      fitVar: "fill",
    };
  },
  methods: {
    async sendMessage() {
      if (this.message.trim().length != 0) {
        const id = getAuth().currentUser.uid;
        const db = getFirestore(firebaseApp);
        const messageInfo = {
          userUID: id,
          text: this.message,
          createdAt: serverTimestamp(),
        };
        await addDoc(collection(db, this.collectionName), messageInfo);
        this.message = "";
        // this.$refs["scrollable"].scrollIntoView({ behavior: "smooth" });
      }
    },
  },
};
</script>


<style scoped>
.bg-green {
  background-color: #96c67f;
}
.bg-purple {
  background-color: #a5a6f6;
}
.el-avatar {
  /* --el-avatar-text-color: #fff; */
  --el-avatar-bg-color: #fff !important;
}
.header-ele {
  height: 60px;
  display: flex;
}
.avatar-img {
  margin: auto 10px auto 10px;
}
/* h4 {
  margin: 0;
} */
.profile-name {
  /* padding: 15px; */
  font-family: "Poppins";
  font-size: 14px;
  display: inline;
  margin: auto 0;
}
.chat-header {
  height: 30px;
  /* max-width: 800px; */
  /* padding: 10px; */
  /* margin: 0 auto; */
}
.bg-purple-dark {
  background: #99a9bf;
}
.chat-area {
  /*   border: 1px solid #ccc; */
  background: white;
  height: 50vh;
  padding: 10px;
  overflow: auto;
  /* max-width: 800px; */
  margin: 0 auto 2em auto;
  box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.3);
}
.message {
  /* width: 30%; */
  border-radius: 10px;
  padding: 0.5em;
  /*   margin-bottom: .5em; */
  font-size: 0.8em;
  font-family: "Poppins";
}
.message-out {
  background: #407fff;
  color: white;
  margin-left: 70%;
}
.message-in {
  background: #f1f0f0;
  color: black;
  margin-right: 70%;
}
</style>
<style>
el-avatar > img {
  display: block;
  /* height: 100%; */
  width: 100% !important;
}
</style>
